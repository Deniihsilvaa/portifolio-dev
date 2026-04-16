export type AdminProjectStatus = "draft" | "published";

export type AdminProject = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  github_url: string;
  demo_url: string | null;
  featured: boolean;
  status: AdminProjectStatus;
};

export type AdminProjectInput = Omit<AdminProject, "id">;
