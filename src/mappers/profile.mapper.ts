import type { Profile } from "@/features/profile/types/profile";

export function mapProfile(dbProfile: any): Profile {
  if (!dbProfile) {
    return {
      name: "",
      title: "",
      summary: "",
      location: "",
      avatarUrl: "",
      availability: "",
      bio: [],
      skills: [],
      socialLinks: [],
    };
  }

  const socialLinks = [];
  if (dbProfile.github_url) {
    socialLinks.push({ label: "GitHub", href: dbProfile.github_url });
  }
  if (dbProfile.linkedin_url) {
    socialLinks.push({ label: "LinkedIn", href: dbProfile.linkedin_url });
  }
  if (dbProfile.email) {
    socialLinks.push({ label: "Email", href: `mailto:${dbProfile.email}` });
  }

  // bio should become an array, probably split by newlines
  const bioArray = dbProfile.bio
    ? dbProfile.bio.split("\n").filter((p: string) => p.trim() !== "")
    : [];

  return {
    name: dbProfile.name || "",
    title: dbProfile.title || "",
    summary: dbProfile.bio || "",
    location: "", // Left blank instead of 'Global' to avoid UI weirdness
    avatarUrl: dbProfile.avatar_url || "",
    availability: "Available", // Not in DB
    bio: bioArray,
    skills: [], // Not in DB schema for profile
    socialLinks,
  };
}
