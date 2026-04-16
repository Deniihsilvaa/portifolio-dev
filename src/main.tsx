import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "motion/react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { AdminAuthProvider } from "@/features/admin/hooks/useAdminAuth";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <AdminAuthProvider>
        <RouterProvider router={router} />
      </AdminAuthProvider>
    </MotionConfig>
  </React.StrictMode>,
);
