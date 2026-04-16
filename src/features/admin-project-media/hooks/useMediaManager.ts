import { useEffect, useMemo, useRef, useState } from "react";
import type {
  ExistingMediaItem,
  MediaType,
  ProjectMediaItem,
  ProjectMediaRecord,
} from "@/features/admin-project-media/types/media.types";

const maxImageWidth = 1920;
const imageQuality = 0.8;
const maxVideoSizeBytes = 100 * 1024 * 1024;

type UseMediaManagerOptions = {
  initialMedia?: ProjectMediaRecord[];
};

type UseMediaManagerState = {
  mediaItems: ProjectMediaItem[];
  activeIndex: number;
  error: string | null;
  setActiveIndex: (index: number) => void;
  addFiles: (files: FileList | File[]) => Promise<void>;
  removeMedia: (localId: string) => void;
  moveMedia: (fromIndex: number, toIndex: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
};

function reorderMedia(items: ProjectMediaItem[]) {
  return items.map((item, index) => ({
    ...item,
    display_order: index,
  }));
}

function mapExistingMedia(initialMedia: ProjectMediaRecord[]): ExistingMediaItem[] {
  return initialMedia
    .slice()
    .sort((a, b) => a.display_order - b.display_order)
    .map((item, index) => ({
      kind: "existing" as const,
      localId: `existing-${item.id}`,
      id: item.id,
      project_id: item.project_id,
      type: item.type,
      url: item.url,
      previewUrl: item.url,
      display_order: index,
    }));
}

async function compressImage(file: File) {
  const imageUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error(`Unable to read image "${file.name}".`));
      element.src = imageUrl;
    });

    const scale = Math.min(1, maxImageWidth / image.width);
    const width = Math.round(image.width * scale);
    const height = Math.round(image.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to compress image.");
    }

    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) {
            resolve(result);
            return;
          }

          reject(new Error(`Unable to compress image "${file.name}".`));
        },
        file.type === "image/png" ? "image/png" : "image/jpeg",
        imageQuality,
      );
    });

    return new File([blob], file.name, {
      type: blob.type,
      lastModified: Date.now(),
    });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

async function normalizeFile(file: File) {
  if (file.type.startsWith("image/")) {
    return compressImage(file);
  }

  if (file.type.startsWith("video/")) {
    if (file.size > maxVideoSizeBytes) {
      throw new Error(`Video "${file.name}" exceeds the 100MB size limit.`);
    }

    return file;
  }

  throw new Error(`Unsupported file type for "${file.name}".`);
}

export function useMediaManager({
  initialMedia = [],
}: UseMediaManagerOptions = {}): UseMediaManagerState {
  const [mediaItems, setMediaItems] = useState<ProjectMediaItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const mediaItemsRef = useRef<ProjectMediaItem[]>([]);

  useEffect(() => {
    mediaItemsRef.current = mediaItems;
  }, [mediaItems]);

  useEffect(() => {
    setMediaItems(mapExistingMedia(initialMedia));
    setActiveIndex(0);
  }, [initialMedia]);

  useEffect(() => {
    return () => {
      mediaItemsRef.current.forEach((item) => {
        if (item.kind === "pending") {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    };
  }, []);

  async function addFiles(files: FileList | File[]) {
    setError(null);

    try {
      const list = Array.from(files);
      const prepared = await Promise.all(
        list.map(async (file, index) => {
          const normalizedFile = await normalizeFile(file);
          const previewUrl = URL.createObjectURL(normalizedFile);
          const type: MediaType = normalizedFile.type.startsWith("image/")
            ? "image"
            : "video";

          return {
            kind: "pending" as const,
            localId: `pending-${Date.now()}-${index}-${normalizedFile.name}`,
            type,
            file: normalizedFile,
            previewUrl,
            display_order: mediaItems.length + index,
          };
        }),
      );

      setMediaItems((current) => reorderMedia([...current, ...prepared]));
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to add media.");
    }
  }

  function removeMedia(localId: string) {
    setMediaItems((current) => {
      const target = current.find((item) => item.localId === localId);
      if (target?.kind === "pending") {
        URL.revokeObjectURL(target.previewUrl);
      }

      const nextItems = reorderMedia(current.filter((item) => item.localId !== localId));
      setActiveIndex((currentIndex) => {
        if (nextItems.length === 0) {
          return 0;
        }

        return Math.min(currentIndex, nextItems.length - 1);
      });
      return nextItems;
    });
  }

  function moveMedia(fromIndex: number, toIndex: number) {
    setMediaItems((current) => {
      if (fromIndex === toIndex || toIndex < 0 || toIndex >= current.length) {
        return current;
      }

      const next = [...current];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return reorderMedia(next);
    });
    setActiveIndex(toIndex);
  }

  function goToNext() {
    setActiveIndex((current) => (mediaItems.length > 0 ? (current + 1) % mediaItems.length : 0));
  }

  function goToPrevious() {
    setActiveIndex((current) =>
      mediaItems.length > 0 ? (current - 1 + mediaItems.length) % mediaItems.length : 0,
    );
  }

  return useMemo(
    () => ({
      mediaItems,
      activeIndex,
      error,
      setActiveIndex,
      addFiles,
      removeMedia,
      moveMedia,
      goToNext,
      goToPrevious,
    }),
    [activeIndex, error, mediaItems],
  );
}
