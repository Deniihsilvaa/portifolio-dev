import { supabaseClient } from "@/lib/supabaseClient";
import type { Profile } from "@/features/profile/types/profile";

const fallbackProfile: Profile = {
  name: "Denis",
  title: "Frontend Engineer building product narratives",
  summary:
    "I design and ship portfolio-grade interfaces with a strong focus on clarity, systems thinking, and implementation quality.",
  location: "Sao Paulo, Brazil",
  avatarUrl: "/images/profile/profile-avatar.svg",
  availability: "Available for freelance and product collaborations",
  bio: [
    "My work sits between visual design and frontend architecture. I care about expressive interfaces that still remain maintainable.",
    "This starter was generated from the Antigravity Stitch workflow and keeps data access isolated inside services for Supabase integration.",
  ],
  skills: ["React", "TypeScript", "TailwindCSS", "Supabase", "Design Systems"],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export async function getProfile(): Promise<Profile> {
  if (!supabaseClient) {
    return fallbackProfile;
  }

  const { data, error } = await supabaseClient
    .from("profile")
    .select("*")
    .single();

  if (error || !data) {
    return fallbackProfile;
  }

  const profile = data as Profile;
  return {
    ...fallbackProfile,
    ...profile,
    bio: profile.bio ?? [],
    skills: profile.skills ?? [],
    socialLinks: profile.socialLinks ?? []
  } as Profile;
}
