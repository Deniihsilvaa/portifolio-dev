export type MediaType = "image" | "video";

export type ProjectMediaRecord = {
  id: string;
  project_id: string;
  type: MediaType;
  url: string;
  display_order: number;
};

export type ExistingMediaItem = {
  kind: "existing";
  localId: string;
  id: string;
  project_id: string;
  type: MediaType;
  url: string;
  previewUrl: string;
  display_order: number;
};

export type PendingMediaItem = {
  kind: "pending";
  localId: string;
  type: MediaType;
  file: File;
  previewUrl: string;
  display_order: number;
};

export type ProjectMediaItem = ExistingMediaItem | PendingMediaItem;
