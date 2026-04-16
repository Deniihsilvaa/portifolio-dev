import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type {
  AdminProjectInput,
  AdminProjectStatus,
} from "@/features/admin-projects/types/project.types";

type ProjectFormProps = {
  title: string;
  submitLabel: string;
  initialValues?: AdminProjectInput;
  isLoading: boolean;
  error: string | null;
  onSubmit: (values: AdminProjectInput) => Promise<void>;
};

const defaultValues: AdminProjectInput = {
  title: "",
  slug: "",
  short_description: "",
  description: "",
  github_url: "",
  demo_url: "",
  featured: false,
  status: "draft",
};

export function ProjectForm({
  title,
  submitLabel,
  initialValues = defaultValues,
  isLoading,
  error,
  onSubmit,
}: ProjectFormProps) {
  const [formValues, setFormValues] = useState<AdminProjectInput>(initialValues);

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  function updateField<K extends keyof AdminProjectInput>(
    field: K,
    value: AdminProjectInput[K],
  ) {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await onSubmit({
      ...formValues,
      demo_url: formValues.demo_url || null,
    });
  }

  return (
    <section className="surface-card w-full max-w-4xl rounded-[2rem] p-8 shadow-card">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">
          Admin Projects
        </p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-on-card">
          {title}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Title"
            value={formValues.title}
            onChange={(value) => updateField("title", value)}
            required
          />
          <Field
            label="Slug"
            value={formValues.slug}
            onChange={(value) => updateField("slug", value)}
            required
          />
        </div>

        <Field
          label="Short Description"
          value={formValues.short_description}
          onChange={(value) => updateField("short_description", value)}
          required
        />

        <TextareaField
          label="Description"
          value={formValues.description}
          onChange={(value) => updateField("description", value)}
          required
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="GitHub URL"
            value={formValues.github_url}
            onChange={(value) => updateField("github_url", value)}
            required
          />
          <Field
            label="Demo URL"
            value={formValues.demo_url ?? ""}
            onChange={(value) => updateField("demo_url", value)}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-on-card">Status</span>
            <select
              value={formValues.status}
              onChange={(event) =>
                updateField("status", event.target.value as AdminProjectStatus)
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
              checked={formValues.featured}
              onChange={(event) => updateField("featured", event.target.checked)}
              className="h-4 w-4 rounded border hairline-card"
            />
            <span className="text-sm font-semibold text-on-card">Featured project</span>
          </label>
        </div>

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
