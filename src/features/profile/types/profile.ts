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
