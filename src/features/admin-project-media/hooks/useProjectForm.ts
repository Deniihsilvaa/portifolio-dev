import { useEffect, useMemo, useState } from "react";
import {
  createProject,
  getProjectById,
  updateProject,
} from "@/features/admin-project-media/services/project.service";
import {
  deleteMedia,
  getProjectMedia,
  updateMediaOrder,
  uploadMedia,
} from "@/features/admin-project-media/services/media.service";
import type {
  AdminProjectFormValues,
  AdminProjectPayload,
  AdminProjectRecord,
} from "@/features/admin-project-media/types/project.types";
import type {
  ExistingMediaItem,
  ProjectMediaItem,
  ProjectMediaRecord,
} from "@/features/admin-project-media/types/media.types";
import { useMediaManager } from "@/features/admin-project-media/hooks/useMediaManager";

const defaultValues: AdminProjectFormValues = {
  title: "",
  slug: "",
  short_description: "",
  description: "",
  github_url: "",
  demo_url: "",
  featured: false,
  status: "draft",
};

type UseProjectFormOptions = {
  projectId?: string;
};

type UseProjectFormState = {
  values: AdminProjectFormValues;
  project: AdminProjectRecord | null;
  mediaItems: ProjectMediaItem[];
  activeIndex: number;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  mediaError: string | null;
  isEditing: boolean;
  updateField: <K extends keyof AdminProjectFormValues>(
    field: K,
    value: AdminProjectFormValues[K],
  ) => void;
  addFiles: (files: FileList | File[]) => Promise<void>;
  removeMedia: (localId: string) => void;
  moveMedia: (fromIndex: number, toIndex: number) => void;
  setActiveIndex: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  submit: () => Promise<void>;
};

function toPayload(values: AdminProjectFormValues): AdminProjectPayload {
  return {
    ...values,
    demo_url: values.demo_url || null,
  };
}

export function useProjectForm({
  projectId,
}: UseProjectFormOptions = {}): UseProjectFormState {
  const [values, setValues] = useState<AdminProjectFormValues>(defaultValues);
  const [project, setProject] = useState<AdminProjectRecord | null>(null);
  const [initialMedia, setInitialMedia] = useState<ProjectMediaRecord[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(projectId));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditing = Boolean(projectId);
  const mediaManager = useMediaManager({ initialMedia });

  useEffect(() => {
    if (!projectId) {
      setValues(defaultValues);
      setProject(null);
      setInitialMedia([]);
      setIsLoading(false);
      return;
    }

    const existingProjectId = projectId;

    let isMounted = true;

    async function loadProject() {
      setIsLoading(true);
      setError(null);

      try {
        const [projectRecord, mediaRecords] = await Promise.all([
          getProjectById(existingProjectId),
          getProjectMedia(existingProjectId),
        ]);

        if (!isMounted || !projectRecord) {
          return;
        }

        setProject(projectRecord);
        setValues({
          title: projectRecord.title,
          slug: projectRecord.slug,
          short_description: projectRecord.short_description,
          description: projectRecord.description,
          github_url: projectRecord.github_url,
          demo_url: projectRecord.demo_url ?? "",
          featured: projectRecord.featured,
          status: projectRecord.status,
        });
        setInitialMedia(mediaRecords);
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load project.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProject();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  function updateField<K extends keyof AdminProjectFormValues>(
    field: K,
    value: AdminProjectFormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function submit() {
    setIsSaving(true);
    setError(null);

    try {
      const payload = toPayload(values);
      const savedProject = projectId
        ? await updateProject(projectId, payload)
        : await createProject(payload);

      const existingItems = mediaManager.mediaItems.filter(
        (item): item is ExistingMediaItem => item.kind === "existing",
      );
      const pendingItems = mediaManager.mediaItems.filter(
        (item): item is Extract<ProjectMediaItem, { kind: "pending" }> => item.kind === "pending",
      );

      if (projectId) {
        const retainedIds = new Set(existingItems.map((item) => item.id));
        const deletedMedia = initialMedia.filter((item) => !retainedIds.has(item.id));

        await Promise.all(deletedMedia.map((item) => deleteMedia(item.id)));
      }

      const uploadedMedia = await Promise.all(
        pendingItems.map((item) =>
          uploadMedia(item.file, savedProject.id, item.display_order),
        ),
      );

      const pendingByLocalId = new Map(
        pendingItems.map((item, index) => [item.localId, uploadedMedia[index]]),
      );

      const finalMediaOrder = mediaManager.mediaItems
        .map((item, index) => {
          if (item.kind === "existing") {
            return { id: item.id, display_order: index };
          }

          const uploadedItem = pendingByLocalId.get(item.localId);
          return uploadedItem
            ? {
                id: uploadedItem.id,
                display_order: index,
              }
            : null;
        })
        .filter((item): item is { id: string; display_order: number } => item !== null);

      await updateMediaOrder(finalMediaOrder);
      setProject(savedProject);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save project.");
      throw submitError;
    } finally {
      setIsSaving(false);
    }
  }

  return useMemo(
    () => ({
      values,
      project,
      mediaItems: mediaManager.mediaItems,
      activeIndex: mediaManager.activeIndex,
      isLoading,
      isSaving,
      error,
      mediaError: mediaManager.error,
      isEditing,
      updateField,
      addFiles: mediaManager.addFiles,
      removeMedia: mediaManager.removeMedia,
      moveMedia: mediaManager.moveMedia,
      setActiveIndex: mediaManager.setActiveIndex,
      goToNext: mediaManager.goToNext,
      goToPrevious: mediaManager.goToPrevious,
      submit,
    }),
    [
      error,
      isEditing,
      isLoading,
      isSaving,
      mediaManager.activeIndex,
      mediaManager.addFiles,
      mediaManager.error,
      mediaManager.goToNext,
      mediaManager.goToPrevious,
      mediaManager.mediaItems,
      mediaManager.moveMedia,
      mediaManager.removeMedia,
      mediaManager.setActiveIndex,
      project,
      values,
    ],
  );
}
