import type { FormEvent } from "react";
import { useState } from "react";

type AdminLoginFormProps = {
  isConfigured: boolean;
  isLoading: boolean;
  error: string | null;
  onSubmit: (input: { email: string; password: string }) => Promise<void>;
};

export function AdminLoginForm({
  isConfigured,
  isLoading,
  error,
  onSubmit,
}: AdminLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit({ email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card w-full max-w-md rounded-[2rem] p-8 shadow-card">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">
          Restricted Access
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-on-card">
          Admin login
        </h1>
        <p className="text-sm leading-6 text-muted-on-card">
          Access is limited to manually provisioned Supabase admin users.
        </p>
      </div>

      <div className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-on-card">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-2xl border hairline-card bg-white px-4 py-3 text-sm text-on-card outline-none transition focus:border-[var(--color-accent-coral)]"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-on-card">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            className="w-full rounded-2xl border hairline-card bg-white px-4 py-3 text-sm text-on-card outline-none transition focus:border-[var(--color-accent-coral)]"
          />
        </label>

        {error ? (
          <div className="rounded-2xl bg-[rgba(239,108,87,0.12)] px-4 py-3 text-sm text-[var(--color-text-dark)]">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isLoading || !isConfigured}
          className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-text-dark)] px-5 py-3 text-sm font-semibold text-[var(--color-card-strong)] transition hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
