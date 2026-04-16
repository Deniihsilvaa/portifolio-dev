import type { ChangeEvent, DragEvent } from "react";

type MediaUploadZoneProps = {
  onFilesSelected: (files: FileList | File[]) => Promise<void>;
};

export function MediaUploadZone({ onFilesSelected }: MediaUploadZoneProps) {
  async function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      await onFilesSelected(event.target.files);
      event.target.value = "";
    }
  }

  async function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();

    if (event.dataTransfer.files.length > 0) {
      await onFilesSelected(event.dataTransfer.files);
    }
  }

  return (
    <label
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed hairline-card bg-[rgba(17,24,39,0.03)] p-8 text-center"
    >
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        className="sr-only"
        onChange={handleFileInput}
      />
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">
        Upload Media
      </p>
      <h3 className="mt-3 font-display text-2xl font-bold text-on-card">
        Drag and drop images or videos
      </h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-on-card">
        Click to browse or drag files here. Images are compressed in the browser before upload.
      </p>
    </label>
  );
}
