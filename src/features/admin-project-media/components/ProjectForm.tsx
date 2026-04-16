import type { FormEvent } from "react";
import { MediaPreviewCarousel } from "@/features/admin-project-media/components/MediaPreviewCarousel";
import { MediaUploadZone } from "@/features/admin-project-media/components/MediaUploadZone";
import type { ProjectMediaItem } from "@/features/admin-project-media/types/media.types";
import type {
  AdminProjectFormValues,
  AdminProjectStatus,
} from "@/features/admin-project-media/types/project.types";

type ProjectFormProps = {
  title: string;
  submitLabel: string;
  values: AdminProjectFormValues;
  mediaItems: ProjectMediaItem[];
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

export function ProjectForm({
  title,
  submitLabel,
  values,
  mediaItems,
  activeIndex,
  isLoading,
  error,
  mediaError,
  onFieldChange,
  onFilesSelected,
  onRemoveMedia,
  onMoveMedia,
  onSelectMedia,
  onNextMedia,
  onPreviousMedia,
  onSubmit,
}: ProjectFormProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit();
  }

  return (
    <section className="surface-card w-full max-w-6xl rounded-[2rem] p-8 shadow-card">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">
          Admin Projects
        </p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-on-card">
          {title}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Title"
                value={values.title}
                onChange={(value) => onFieldChange("title", value)}
                required
              />
              <Field
                label="Slug"
                value={values.slug}
                onChange={(value) => onFieldChange("slug", value)}
                required
              />
            </div>

            <Field
              label="Short Description"
              value={values.short_description}
              onChange={(value) => onFieldChange("short_description", value)}
              required
            />

            <TextareaField
              label="Description"
              value={values.description}
              onChange={(value) => onFieldChange("description", value)}
              required
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="GitHub URL"
                value={values.github_url}
                onChange={(value) => onFieldChange("github_url", value)}
                required
              />
              <Field
                label="Demo URL"
                value={values.demo_url}
                onChange={(value) => onFieldChange("demo_url", value)}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-on-card">Status</span>
                <select
                  value={values.status}
                  onChange={(event) =>
                    onFieldChange("status", event.target.value as AdminProjectStatus)
                  }
                  className="w-full rounded-2xl border hairline-card bg-white px-4 py-3 text-sm text-on-card outline-none transition focus:border-[var(--color-accent-coral)]"
                >
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </label>

              <label className="flex items-center gap-3 rounded-2xl border hairline-card bg-[rgba(17,24,39,0.03)] px-4 py-3">
                <input
                  type="checkbox"
                  checked={values.featured}
                  onChange={(event) => onFieldChange("featured", event.target.checked)}
                  className="h-4 w-4 rounded border hairline-card"
                />
                <span className="text-sm font-semibold text-on-card">Featured project</span>
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <MediaUploadZone onFilesSelected={onFilesSelected} />
            <MediaPreviewCarousel
              items={mediaItems}
              activeIndex={activeIndex}
              onSelect={onSelectMedia}
              onRemove={onRemoveMedia}
              onMove={onMoveMedia}
              onNext={onNextMedia}
              onPrevious={onPreviousMedia}
            />
          </div>
        </div>

        {mediaError ? (
          <div className="rounded-2xl bg-[rgba(239,108,87,0.12)] px-4 py-3 text-sm text-on-card">
            {mediaError}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl bg-[rgba(239,108,87,0.12)] px-4 py-3 text-sm text-on-card">
            {error}
          </div>
        ) : null}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-[var(--color-text-dark)] px-5 py-3 text-sm font-semibold text-[var(--color-card-strong)] transition hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

function Field({ label, value, onChange, required }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-on-card">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full rounded-2xl border hairline-card bg-white px-4 py-3 text-sm text-on-card outline-none transition focus:border-[var(--color-accent-coral)]"
      />
    </label>
  );
}

type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

function TextareaField({
  label,
  value,
  onChange,
  required,
}: TextareaFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-on-card">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        rows={8}
        className="w-full rounded-[1.5rem] border hairline-card bg-white px-4 py-3 text-sm text-on-card outline-none transition focus:border-[var(--color-accent-coral)]"
      />
    </label>
  );
}
