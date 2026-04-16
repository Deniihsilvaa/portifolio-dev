import { supabaseClient } from "@/lib/supabaseClient";
import type { Project } from "@/features/projects/types/project";

const fallbackProjects: Project[] = [
  {
    id: "atlas-commerce",
    slug: "atlas-commerce",
    title: "Atlas Commerce",
    subtitle: "A storefront system with editorial product storytelling",
    summary:
      "Responsive commerce experience focused on fast browsing, narrative PDPs, and modular content zones.",
    category: "E-commerce",
    stack: ["React", "TypeScript", "TailwindCSS", "Supabase"],
    coverImage: "/images/projects/atlas-cover.svg",
    gallery: [
      "/images/projects/atlas-cover.svg",
      "/images/projects/atlas-gallery-1.svg",
      "/images/projects/atlas-gallery-2.svg",
    ],
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    readme: `# Atlas Commerce

Atlas Commerce is a modular storefront concept built around flexible content blocks and clean browsing flows.

## Highlights

- Feature-based architecture
- Presentational components with service-backed hooks
- Supabase-ready data layer

## Stack

\`\`\`txt
React
TypeScript
TailwindCSS
Supabase
\`\`\`
`,
  },
  {
    id: "signal-dashboard",
    slug: "signal-dashboard",
    title: "Signal Dashboard",
    subtitle: "Operational dashboard for product and support teams",
    summary:
      "A metrics-heavy interface with priority queues, health indicators, and collaborative project views.",
    category: "Dashboard",
    stack: ["React", "Vite", "TailwindCSS"],
    coverImage: "/images/projects/signal-cover.svg",
    gallery: [
      "/images/projects/signal-cover.svg",
      "/images/projects/signal-gallery-1.svg",
      "/images/projects/signal-gallery-2.svg",
    ],
    githubUrl: "https://github.com/",
    readme: `# Signal Dashboard

Signal Dashboard centralizes product health, delivery status, and support queues in one interface.

## Features

- Project summaries
- Status-based filtering
- Mobile-friendly card system
`,
  },
];

export async function getProjects(): Promise<Project[]> {
  if (!supabaseClient) {
    return fallbackProjects;
  }

  const { data, error } = await supabaseClient
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return fallbackProjects;
  }

  return (data as Project[]).map(project => ({
    ...project,
    stack: project.stack ?? [],
    gallery: project.gallery ?? []
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabaseClient) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  const { data, error } = await supabaseClient
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  const project = data as Project;
  return {
    ...project,
    stack: project.stack ?? [],
    gallery: project.gallery ?? []
  };
}
