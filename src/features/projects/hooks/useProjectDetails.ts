import { useEffect, useState } from "react";
import { getProjectBySlug } from "@/features/projects/services/project.service";
import type { Project } from "@/features/projects/types/project";

type UseProjectDetailsState = {
  project: Project | null;
  isLoading: boolean;
  error: string | null;
};

export function useProjectDetails(slug: string): UseProjectDetailsState {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setProject(null);
      setIsLoading(false);
      setError("Missing project slug");
      return;
    }

    let isMounted = true;

    async function loadProject() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProjectBySlug(slug);

        if (isMounted) {
          if (!data) {
            setError("Project not found");
          }
          setProject(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load project");
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
  }, [slug]);

  return { project, isLoading, error };
}
