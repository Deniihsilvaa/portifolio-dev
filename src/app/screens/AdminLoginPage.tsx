import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AdminLoginForm } from "@/features/admin/components/AdminLoginForm";
import { useAdminAuth } from "@/features/admin/hooks/useAdminAuth";

type LocationState = {
  from?: string;
};

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isConfigured, isLoading, error, login, clearError } = useAdminAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(input: { email: string; password: string }) {
    clearError();
    await login(input);

    const state = location.state as LocationState | null;
    navigate(state?.from || "/admin", { replace: true });
  }

  return (
    <AdminLoginForm
      isConfigured={isConfigured}
      isLoading={isLoading}
      error={error ?? (!isConfigured ? "Supabase Auth is not configured." : null)}
      onSubmit={handleSubmit}
    />
  );
}
