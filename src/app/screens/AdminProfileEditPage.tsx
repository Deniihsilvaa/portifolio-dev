import { useProfileEdit } from "@/features/profile/hooks/useProfile";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";

export function AdminProfileEditPage() {
  const { error, isSaving, handleChange, handleSubmit, isLoading, formData, handlerNavigate } = useProfileEdit();
  if (isLoading) {
    return <div className="p-8 text-white">Carregando configurações do perfil...</div>;
  }
  return (
    <div className="container mx-auto p-5 scroll-mt-20">
      <div className="mb-4">
        <h1 className="font-display text-4xl font-extrabold text-white">Editar Perfil</h1>
        <p className="text-muted-on-surface">
          Esta é a sua base de comando. Atualize a sua identidade visual, biografia e conexões!
        </p>
      </div>

      {error ? (
        <div className="rounded-xl bg-red-500/10 p-4 text-sm font-medium text-red-500">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="surface-card rounded-[2rem] border hairline-card bg-surface/30 p-8 shadow-card backdrop-blur-md">
              <h2 className="mb-6 font-display text-xl font-bold text-black">Informações da Identidade</h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-muted-on-card" htmlFor="name">
                    Nome Completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3.5 text-black placeholder-white/30 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-muted-on-card" htmlFor="title">
                    Profissão / Título
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3.5 text-black placeholder-white/30 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
                    placeholder="Engenheiro de Software"
                    required
                  />
                </div>

                <div>
                  <Field>
                    <FieldLabel htmlFor="bio" className="mb-2 block text-sm font-semibold text-muted-on-card">
                      Biografia Profissional
                    </FieldLabel>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={6}
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/20 p-3.5 text-black placeholder-white/30 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
                      placeholder="Conte sobre sua paixão pela tecnologia..."
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>

          {/* Socials & Media Column */}
          <div className="space-y-6">
            <div className="surface-card rounded-[2rem] border hairline-card bg-surface/30 p-8 shadow-card backdrop-blur-md">
              <h2 className="mb-6 font-display text-xl font-bold text-black">Mídias e Contatos</h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-muted-on-card" htmlFor="avatar_url">
                    URL do Avatar
                  </label>
                  <input
                    id="avatar_url"
                    name="avatar_url"
                    type="url"
                    value={formData.avatar_url}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-black focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
                    placeholder="https://..."
                  />
                  {formData.avatar_url && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={formData.avatar_url}
                        alt="Preview"
                        className="h-28 w-28 rounded-full border-2 border-white/10 object-cover shadow-xl"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-muted-on-card" htmlFor="email">
                    Endereço de E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-black focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral transition"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-muted-on-card" htmlFor="github_url">
                    GitHub Profile
                  </label>
                  <input
                    id="github_url"
                    name="github_url"
                    type="url"
                    value={formData.github_url}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-black focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-muted-on-card" htmlFor="linkedin_url">
                    LinkedIn Profile
                  </label>
                  <input
                    id="linkedin_url"
                    name="linkedin_url"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-black focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => handlerNavigate("/admin")}
                  disabled={isSaving}
                  className="rounded-full px-6 py-3 font-semibold text-muted-on-card hover:bg-white/5 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-full bg-teal px-8 py-3 font-semibold text-ink shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSaving ? "Salvando..." : "Salvar Perfil"}
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
