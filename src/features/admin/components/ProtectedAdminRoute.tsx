import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/features/admin/hooks/useAdminAuth";

export function ProtectedAdminRoute({ children }: PropsWithChildren) {
  const location = useLocation();
  const { isAuthenticated, isConfigured, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="surface-card rounded-[2rem] p-8 shadow-card">
        Verifying admin session...
      </div>
    );
  }

  if (!isConfigured) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }

  return <>{children}</>;
}
