import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { useAdminAuth } from "@/features/admin/hooks/useAdminAuth";

export function AdminShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, session } = useAdminAuth();

  async function handleLogout() {
    await logout();
    navigate("/admin/login", { replace: true });
  }

  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Projects", href: "/admin/projects" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-app-bg)] text-on-dark">
      <PageContainer>
        <div className="py-8">
          <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border hairline-dark bg-white/5 p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">
                Admin Panel
              </p>
              <p className="text-sm text-muted-on-dark">{session?.user.email ?? "Restricted area"}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-white text-[var(--color-text-dark)]"
                        : "border hairline-dark bg-white/5 text-on-dark hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {location.pathname !== "/admin/login" ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border hairline-dark px-4 py-2 text-sm font-semibold text-on-dark transition hover:-translate-y-0.5"
                >
                  Logout
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex min-h-[calc(100vh-12rem)] items-start justify-center">
            <Outlet />
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
