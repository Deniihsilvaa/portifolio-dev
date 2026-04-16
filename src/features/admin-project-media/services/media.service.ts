import { supabaseClient } from "@/lib/supabaseClient";
import type {
  MediaType,
  ProjectMediaRecord,
} from "@/features/admin-project-media/types/media.types";

const bucketName = "project-media";
const mediaColumns = "id, project_id, type, url, display_order";

function mapMediaErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("bucket not found")) {
    console.log('bucket não foi criado ainda', message);
    return 'Supabase Storage bucket "project-media" was not found. Create the bucket before uploading media.';
  }

  if (normalized.includes("row-level security")) {
    return "Supabase blocked storage or project_media access. Create authenticated policies for the project-media bucket and project_media table.";
  }

  return message;
}

function assertSupabaseClient() {
  if (!supabaseClient) {
    throw new Error("Supabase client is not configured.");
  }

  return supabaseClient;
}

function getMediaType(file: File): MediaType {
  if (file.type.startsWith("image/")) {
    return "image";
  }

  if (file.type.startsWith("video/")) {
    return "video";
  }

  throw new Error(`Unsupported media type for file "${file.name}".`);
}

function sanitizeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.\-_]+/g, "-");
}

function buildStoragePath(projectId: string, file: File) {
  const type = getMediaType(file);
  const folder = type === "image" ? "images" : "videos";
  const safeName = sanitizeFileName(file.name);
  return {
    type,
    path: `${projectId}/${folder}/${Date.now()}-${safeName}`,
  };
}

function extractBucketPathFromPublicUrl(url: string) {
  const marker = `/storage/v1/object/public/${bucketName}/`;
  const index = url.indexOf(marker);

  if (index === -1) {
    return null;
  }

  return decodeURIComponent(url.slice(index + marker.length));
}

let ensureBucketPromise: Promise<void> | null = null;

async function ensureBucketExists() {
  if (ensureBucketPromise) {
    return ensureBucketPromise;
  }

  ensureBucketPromise = (async () => {
    const client = assertSupabaseClient();
    const { data: buckets, error: listError } = await client.storage.listBuckets();

    if (listError) {
      ensureBucketPromise = null;
      throw new Error(`Failed to list buckets: ${listError.message}`);
    }

    const bucketExists = buckets?.some((b) => b.name === bucketName);

    if (!bucketExists) {
      console.log(`Creating public bucket: ${bucketName}`);
      const { error: createError } = await client.storage.createBucket(bucketName, {
        public: true,
      });

      if (createError && !createError.message.toLowerCase().includes("already exists")) {
        ensureBucketPromise = null;
        console.error("Error creating bucket:", createError.message);
      }
    }
  })();

  return ensureBucketPromise;
}

export async function getProjectMedia(projectId: string): Promise<ProjectMediaRecord[]> {
  const client = assertSupabaseClient();
  const { data, error } = await client
    .from("project_media")
    .select(mediaColumns)
    .eq("project_id", projectId)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(mapMediaErrorMessage(error.message));
  }

  return (data ?? []) as ProjectMediaRecord[];
}

export async function uploadMedia(
  file: File,
  projectId: string,
  displayOrder: number,
): Promise<ProjectMediaRecord> {
  const client = assertSupabaseClient();
  
  await ensureBucketExists();

  const { type, path } = buildStoragePath(projectId, file);
  const { error: uploadError } = await client.storage
    .from(bucketName)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(mapMediaErrorMessage(uploadError.message));
  }

  const {
    data: { publicUrl },
  } = client.storage.from(bucketName).getPublicUrl(path);

  const { data, error } = await client
    .from("project_media")
    .insert({
      project_id: projectId,
      type,
      url: publicUrl,
      display_order: displayOrder,
    })
    .select(mediaColumns)
    .single();

  if (error) {
    throw new Error(mapMediaErrorMessage(error.message));
  }

  return data as ProjectMediaRecord;
}

export async function deleteMedia(mediaId: string): Promise<void> {
  const client = assertSupabaseClient();
  const { data, error } = await client
    .from("project_media")
    .select("id, url")
    .eq("id", mediaId)
    .single();

  if (error) {
    throw new Error(mapMediaErrorMessage(error.message));
  }

  const bucketPath = extractBucketPathFromPublicUrl(data.url);

  if (bucketPath) {
    const { error: storageError } = await client.storage.from(bucketName).remove([bucketPath]);

    if (storageError) {
      throw new Error(mapMediaErrorMessage(storageError.message));
    }
  }

  const { error: deleteError } = await client.from("project_media").delete().eq("id", mediaId);

  if (deleteError) {
    throw new Error(mapMediaErrorMessage(deleteError.message));
  }
}

export async function updateMediaOrder(
  mediaList: Array<Pick<ProjectMediaRecord, "id" | "display_order">>,
): Promise<void> {
  if (mediaList.length === 0) {
    return;
  }

  const client = assertSupabaseClient();
  
  const promises = mediaList.map((media) =>
    client
      .from("project_media")
      .update({ display_order: media.display_order })
      .eq("id", media.id)
  );

  const results = await Promise.all(promises);

  const firstError = results.find((result) => result.error);
  if (firstError?.error) {
    throw new Error(mapMediaErrorMessage(firstError.error.message));
  }
}
