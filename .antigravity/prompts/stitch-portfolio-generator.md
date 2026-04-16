# Master Workflow — Stitch Portfolio Generator

Follow all Antigravity skills before generating any code.

This task must automatically generate a React portfolio project based on Stitch UI screens.

The stack is:

React
Vite
TypeScript
TailwindCSS
Supabase

The project must follow a clean architecture pattern and the Antigravity skills defined in the repository.

---

# STEP 1 — Analyze Stitch Screens

Analyze the Stitch project screens and extract the UI structure.

Return a component breakdown for each screen.

Do not generate code yet.

Screens:

Home Page
Projects Grid
Project Details

Break each screen into reusable UI components.

Example structure:

HomePage
HeroSection
AboutSection
ProjectsGrid

ProjectDetails
ProjectHeader
ProjectCarousel
ProjectDescription
GithubLink
ReadmeSection

---

# STEP 2 — Generate Feature Architecture

Create a scalable project structure following clean architecture principles.

Use the following structure:

src/

app/
components/
components/ui/
components/layout/

features/

projects/
components/
hooks/
services/
types/

profile/
components/
hooks/
services/
types/

lib/
hooks/
utils/
styles/

Do not generate component code yet.

---

# STEP 3 — Download Stitch Assets

Download all images and assets from the Stitch screens.

Use:

curl -L

Store them in:

public/images/projects
public/images/profile

---

# STEP 4 — Generate UI Components

Generate React UI components using TailwindCSS.

Rules:

Components must be purely presentational.

Do not include business logic.

Components must receive data via props.

Create reusable components when possible.

Example components:

HeroSection
ProjectGrid
ProjectCard
ProjectCarousel
ReadmeSection

---

# STEP 5 — Generate Hooks

Create custom React hooks responsible for application logic.

Hooks must:

Fetch data
Process responses
Handle loading and error states

Hooks must call services.

Example hooks:

useProjects
useProjectDetails
useProfile

---

# STEP 6 — Generate Services

Create a service layer responsible for communicating with Supabase.

Services must be the only layer allowed to access the database.

Example services:

project.service.ts
profile.service.ts

Example operations:

getProjects
getProjectBySlug
getProfile

---

# STEP 7 — Integrate Supabase

Create a Supabase client configuration inside:

src/lib/supabaseClient.ts

All services must use this client.

---

# STEP 8 — README Rendering

Create a system to render project README content.

Use markdown rendering to display the README inside the Project Details page.

Component:

ReadmeSection

---

# STEP 9 — Routing

Create application routes using React Router.

Routes:

/
Project Home

/project/:slug
Project Details

Router must be defined inside:

src/app/router.tsx

---

# STEP 10 — Final Integration

Ensure the final application respects the architecture:

Component
↓
Hook
↓
Service
↓
Supabase

UI components must not contain data fetching logic.

---

# FINAL RESULT

The generated application must include:

Clean architecture
Reusable components
Feature-based structure
TailwindCSS styling
Supabase data integration
README rendering
