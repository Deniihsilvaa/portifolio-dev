import { useEffect, useState } from "react";
import { editProfileService, getProfile } from "@/features/profile/services/profile.service";
import type { Profile, ProfileEdit } from "@/features/profile/types/profile";

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

export function useProfileEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);


  async function editProfileHook(profile: ProfileEdit) {
    try {
      setIsLoading(true);
      setIsSaving(true);
      setError(null);
      await editProfileService(profile);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to edit profile");
    } finally {
      setIsSaving(false);
      setIsLoading(false);
    }
  }

  return { isLoading, error, editProfileHook, isSaving };
}

