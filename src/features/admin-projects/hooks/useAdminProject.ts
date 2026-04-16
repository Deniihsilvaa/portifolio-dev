import { useEffect, useState } from "react";
import {
  createProject,
  getProjectById,
  updateProject,
} from "@/features/admin-projects/services/adminProjects.service";
import type {
  AdminProject,
  AdminProjectInput,
} from "@/features/admin-projects/types/project.types";

type UseAdminProjectState = {
  project: AdminProject | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  saveNewProject: (input: AdminProjectInput) => Promise<void>;
  saveExistingProject: (input: AdminProjectInput) => Promise<void>;
};

export function useAdminProject(id?: string): UseAdminProjectState {
  const [project, setProject] = useState<AdminProject | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProject(null);
      setIsLoading(false);
      return;
    }

    const projectId = id;

    let isMounted = true;

    async function loadProject() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProjectById(projectId);
        if (isMounted) {
          setProject(data);
        }
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
  }, [id]);

  async function saveNewProject(input: AdminProjectInput) {
    setIsSaving(true);
    setError(null);

    try {
      const created = await createProject(input);
      setProject(created);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to create project.");
      throw saveError;
    } finally {
      setIsSaving(false);
    }
  }

  async function saveExistingProject(input: AdminProjectInput) {
    if (!id) {
      throw new Error("Project id is required.");
    }

    setIsSaving(true);
    setError(null);

    try {
      const updated = await updateProject(id, input);
      setProject(updated);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to update project.");
      throw saveError;
    } finally {
      setIsSaving(false);
    }
  }

  return {
    project,
    isLoading,
    isSaving,
    error,
    saveNewProject,
    saveExistingProject,
  };
}
