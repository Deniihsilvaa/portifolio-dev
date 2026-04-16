import { useEffect, useState } from "react";
import { getProjects } from "@/features/projects/services/project.service";
import type { Project } from "@/features/projects/types/project";

type UseProjectsState = {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
};

export function useProjects(): UseProjectsState {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProjects();
        if (isMounted) {
          setProjects(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load projects");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, isLoading, error };
}
