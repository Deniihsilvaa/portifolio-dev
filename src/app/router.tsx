import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AdminShell } from "@/components/layout/AdminShell";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedAdminRoute } from "@/features/admin/components/ProtectedAdminRoute";

const HomePage = lazy(async () => {
  const module = await import("@/app/screens/HomePage");
  return { default: module.HomePage };
});

const ProjectDetailsPage = lazy(async () => {
  const module = await import("@/app/screens/ProjectDetailsPage");
  return { default: module.ProjectDetailsPage };
});

const AdminLoginPage = lazy(async () => {
  const module = await import("@/app/screens/AdminLoginPage");
  return { default: module.AdminLoginPage };
});

const AdminDashboardPage = lazy(async () => {
  const module = await import("@/app/screens/AdminDashboardPage");
  return { default: module.AdminDashboardPage };
});

const AdminProjectsPage = lazy(async () => {
  const module = await import("@/app/screens/AdminProjectsPage");
  return { default: module.AdminProjectsPage };
});

const AdminProjectCreatePage = lazy(async () => {
  const module = await import("@/app/screens/AdminProjectCreatePage");
  return { default: module.AdminProjectCreatePage };
});

const AdminProjectEditPage = lazy(async () => {
  const module = await import("@/app/screens/AdminProjectEditPage");
  return { default: module.AdminProjectEditPage };
});

function RouteFallback() {
  return (
    <div className="surface-card rounded-[2rem] p-8 shadow-card">
      Loading experience...
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "project/:slug",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ProjectDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminShell />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <AdminLoginPage />
          </Suspense>
        ),
      },
      {
        index: true,
        element: (
          <ProtectedAdminRoute>
            <Suspense fallback={<RouteFallback />}>
              <AdminDashboardPage />
            </Suspense>
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedAdminRoute>
            <Suspense fallback={<RouteFallback />}>
              <AdminProjectsPage />
            </Suspense>
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "projects/new",
        element: (
          <ProtectedAdminRoute>
            <Suspense fallback={<RouteFallback />}>
              <AdminProjectCreatePage />
            </Suspense>
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "projects/edit/:id",
        element: (
          <ProtectedAdminRoute>
            <Suspense fallback={<RouteFallback />}>
              <AdminProjectEditPage />
            </Suspense>
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
]);
