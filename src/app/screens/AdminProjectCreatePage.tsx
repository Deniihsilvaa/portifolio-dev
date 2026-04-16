import { useNavigate } from "react-router-dom";
import { ProjectForm } from "@/features/admin-project-media/components/ProjectForm";
import { useProjectForm } from "@/features/admin-project-media/hooks/useProjectForm";

export function AdminProjectCreatePage() {
  const navigate = useNavigate();
  const form = useProjectForm();

  async function handleSubmit() {
    await form.submit();
    navigate("/admin/projects", { replace: true });
  }

  return (
    <ProjectForm
      title="Create Project"
      submitLabel="Create Project"
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
    />
  );
}
