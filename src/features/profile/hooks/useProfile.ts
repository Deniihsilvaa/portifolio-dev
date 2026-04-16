import { useEffect, useState } from "react";
import { getProfile } from "@/features/profile/services/profile.service";
import type { Profile } from "@/features/profile/types/profile";

type UseProfileState = {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
};

export function useProfile(): UseProfileState {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProfile();
        if (isMounted) {
          setProfile(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load profile");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return { profile, isLoading, error };
}
