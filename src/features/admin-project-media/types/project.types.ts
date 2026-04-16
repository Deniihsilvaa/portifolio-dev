export type AdminProjectStatus = "draft" | "published";

export type AdminProjectFormValues = {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  github_url: string;
  demo_url: string;
  featured: boolean;
  status: AdminProjectStatus;
};

export type AdminProjectRecord = {
  id: string;
} & Omit<AdminProjectFormValues, "demo_url"> & {
    demo_url: string | null;
  };

export type AdminProjectPayload = Omit<AdminProjectRecord, "id">;
