import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageContainer } from "@/components/layout/PageContainer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function AppShell() {
  return (
    <div className="min-h-screen bg-[var(--color-app-bg)] text-on-dark">
      <ScrollProgress />
      <Navbar />
      <main>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </main>
      <Footer />
    </div>
  );
}
