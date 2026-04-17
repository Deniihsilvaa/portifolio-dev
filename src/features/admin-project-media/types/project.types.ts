import { ProjectMediaItem } from "@/features/admin-project-media/types/media.types";
export type Technology = {
  id: string;
  name: string;
  icon_url: string;
}

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
  technologies: any[];
};

export type AdminProjectRecord = {
  id: string;
} & Omit<AdminProjectFormValues, "demo_url"> & {
  demo_url: string | null;
};

export type AdminProjectPayload = Omit<AdminProjectRecord, "id" | "technologies">;


export type ProjectFormProps = {
  title: string;
  submitLabel: string;
  values: AdminProjectFormValues;
  mediaItems: ProjectMediaItem[];
  technologies: Technology[];
  activeIndex: number;
  isLoading: boolean;
  error: string | null;
  mediaError: string | null;
  onFieldChange: <K extends keyof AdminProjectFormValues>(
    field: K,
    value: AdminProjectFormValues[K],
  ) => void;
  onFilesSelected: (files: FileList | File[]) => Promise<void>;
  onRemoveMedia: (localId: string) => void;
  onMoveMedia: (fromIndex: number, toIndex: number) => void;
  onSelectMedia: (index: number) => void;
  onNextMedia: () => void;
  onPreviousMedia: () => void;
  onSubmit: () => Promise<void>;
};
export type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};
export type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};