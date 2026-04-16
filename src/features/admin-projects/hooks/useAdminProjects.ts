import { useEffect, useState } from "react";
import { getProjects } from "@/features/admin-projects/services/adminProjects.service";
import type { AdminProject } from "@/features/admin-projects/types/project.types";

type UseAdminProjectsState = {
  projects: AdminProject[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

export function useAdminProjects(): UseAdminProjectsState {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProjects() {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getProjects();
      setProjects(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load projects.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  return { projects, isLoading, error, reload: loadProjects };
}
