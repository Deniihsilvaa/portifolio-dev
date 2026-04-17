import { useEffect, useState } from "react";
import { editProfileService, getProfile } from "@/features/profile/services/profile.service";
import type { Profile, ProfileEdit } from "@/features/profile/types/profile";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    name: "",
    title: "",
    bio: "",
    avatar_url: "",
    github_url: "",
    linkedin_url: "",
    email: "",
  });

  useEffect(() => {
    async function loadData() {
      const profile = await getProfile();

      if (profile) {
        setFormData({
          name: profile.name,
          title: profile.title,
          bio: profile.bio,
          avatar_url: profile.avatarUrl,
          github_url: profile.socialLinks.find((link: any) => link.label === "GitHub")?.href || "",
          linkedin_url: profile.socialLinks.find((link: any) => link.label === "LinkedIn")?.href || "",
          email: profile.socialLinks.find((link: any) => link.label === "Email")?.href || "",
        });
      }
      setIsLoading(false);
    }
    void loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      await editProfileHook(formData);
      if (error) {
        setError(error);
      } else {
        if (!isSaving) {
          alert("Profile updated successfully");
        }
        // Simulating a brief success delay and navigating to dashboard
        setTimeout(() => navigate("/admin"), 700);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

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

  const handlerNavigate = (path: string) => {
    navigate(path);
  };

  return { isLoading, error, editProfileHook, isSaving, handleChange, handleSubmit, formData, handlerNavigate };
}

