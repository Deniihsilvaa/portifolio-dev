import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/features/admin/hooks/useAdminAuth";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { logout, session } = useAdminAuth();

  async function handleLogout() {
    await logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <section className="surface-card w-full max-w-3xl rounded-[2rem] p-8 shadow-card">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">
            Admin Area
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-on-card">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-on-card">
            Logged in as {session?.user.email}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/admin/projects"
            className="rounded-full bg-[var(--color-text-dark)] px-4 py-2 text-sm font-semibold text-[var(--color-card-strong)] transition hover:-translate-y-0.5"
          >
            Manage Projects
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border hairline-card px-4 py-2 text-sm font-semibold text-on-card transition hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="rounded-[1.5rem] bg-[rgba(17,24,39,0.05)] p-6 text-on-card">
        Admin Dashboard
      </div>
    </section>
  );
}
