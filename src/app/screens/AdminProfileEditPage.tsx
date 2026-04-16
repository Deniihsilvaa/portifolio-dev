import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "@/lib/supabaseClient";
import { editProfile } from "@/features/admin/services/adminAuth.service";
import type { ProfileEdit } from "@/features/profile/types/profile";
import { useProfileEdit } from "@/features/profile/hooks/useProfile";

export function AdminProfileEditPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { error: errorEditProfile, editProfileHook, isSaving: isSavingEditProfile } = useProfileEdit();

  const [formData, setFormData] = useState<ProfileEdit>({
    name: "",
    title: "",
    bio: "",
    avatar_url: "",
    github_url: "",
    linkedin_url: "",
    email: "",
  });

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      if (!supabaseClient) return;

      const ID_USER = import.meta.env.VITE_USER_ID;
      const { data, error: fetchError } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", `${ID_USER}`)
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        setError("Failed to load profile data from database.");
      } else if (data) {
        setFormData({
          name: data.name || "",
          title: data.title || "",
          bio: data.bio || "",
          avatar_url: data.avatar_url || "",
          github_url: data.github_url || "",
          linkedin_url: data.linkedin_url || "",
          email: data.email || "",
        });
      }
      setIsLoading(false);
    }
    void loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      await editProfileHook(formData);
      if (errorEditProfile) {
        setError(errorEditProfile);
      } else {
        if (!isSavingEditProfile) {
          alert("Profile updated successfully");
        }
        // Simulating a brief success delay and navigating to dashboard
        setTimeout(() => navigate("/admin"), 700);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-white">Carregando configurações do perfil...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      <div className="space-y-2">
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
              <h2 className="mb-6 font-display text-xl font-bold text-white">Informações da Identidade</h2>

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
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3.5 text-white placeholder-white/30 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
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
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3.5 text-white placeholder-white/30 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
                    placeholder="Engenheiro de Software"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-muted-on-card" htmlFor="bio">
                    Biografia Profissional
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={6}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/20 p-3.5 text-white placeholder-white/30 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
                    placeholder="Conte sobre sua paixão pela tecnologia..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Socials & Media Column */}
          <div className="space-y-6">
            <div className="surface-card rounded-[2rem] border hairline-card bg-surface/30 p-8 shadow-card backdrop-blur-md">
              <h2 className="mb-6 font-display text-xl font-bold text-white">Mídias e Contatos</h2>

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
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
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
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral transition"
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
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
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
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal transition"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            disabled={isSaving}
            className="rounded-full px-6 py-3 font-semibold text-muted-on-card hover:bg-white/5 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-teal px-8 py-3 font-semibold text-ink shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSaving ? "Salvando..." : "Salvar Perfil"}
          </button>
        </div>
      </form>
    </div>
  );
}
