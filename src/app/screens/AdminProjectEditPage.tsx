import { useNavigate, useParams } from "react-router-dom";
import { ProjectForm } from "@/features/admin-project-media/components/ProjectForm";
import { useProjectForm } from "@/features/admin-project-media/hooks/useProjectForm";

export function AdminProjectEditPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const form = useProjectForm({ projectId: id });

  async function handleSubmit() {
    await form.submit();
    navigate("/admin/projects", { replace: true });
  }

  if (form.isLoading) {
    return (
      <section className="surface-card w-full max-w-4xl rounded-[2rem] p-8 shadow-card">
        Loading project...
      </section>
    );
  }

  if (!form.project) {
    return (
      <section className="surface-card w-full max-w-4xl rounded-[2rem] p-8 shadow-card">
        <p className="text-on-card">{form.error ?? "Project not found."}</p>
      </section>
    );
  }

  return (
    <ProjectForm
      title="Edit Project"
      submitLabel="Save Changes"
      values={form.values}
      mediaItems={form.mediaItems}
      activeIndex={form.activeIndex}
      isLoading={form.isSaving}
      error={form.error}
      mediaError={form.mediaError}
      onFieldChange={form.updateField}
      onFilesSelected={form.addFiles}
      onRemoveMedia={form.removeMedia}
      onMoveMedia={form.moveMedia}
      onSelectMedia={form.setActiveIndex}
      onNextMedia={form.goToNext}
      onPreviousMedia={form.goToPrevious}
      onSubmit={handleSubmit}
      technologies={form.technologies}
    />
  );
}
