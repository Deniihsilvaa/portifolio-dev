export type Profile = {
  name: string;
  title: string;
  summary: string;
  location: string;
  avatarUrl: string;
  availability: string;
  bio: string[];
  skills: string[];
  socialLinks: Array<{
    label: string;
    href: string;
  }>;
};

export type ProfileEdit = {
  name: string;
  title: string;
  bio: string;
  avatar_url: string;
  github_url: string;
  linkedin_url: string;
  email: string;
}

