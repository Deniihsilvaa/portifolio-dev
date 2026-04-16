# Stitch Portfolio Generator

    2
    3 ## Project Overview
    4 **Stitch Portfolio Generator** is a professional, high-performance portfolio starter designed for developers who value clean
      architecture and modularity. Built with **React 19**, **Vite**, and **Tailwind CSS**, it provides a robust foundation for
      showcasing software engineering projects and professional profiles. The project is engineered to work seamlessly with a
      **Supabase** backend while maintaining full functionality via local fallback data.
    5
    6 ## Project Idea
    7 The concept behind this project is to provide a "portfolio-as-a-system" rather than a simple static page. It addresses the common
      developer struggle of maintaining a portfolio by isolating data logic from presentation. By utilizing a feature-based architecture
      and a strict data flow, it allows developers to quickly spin up a professional site that can grow from a simple static showcase to
      a fully dynamic, CMS-driven platform.
    8
    9 ## Features

10 - **Responsive Landing Page:** Includes a high-impact Hero section, About Me, and Featured Projects.
11 - **Dynamic Project Details:** Rich project pages with Markdown support for detailed case studies.
12 - **Feature-Based Architecture:** Logic is encapsulated into `Profile` and `Projects` domains.
13 - **Hybrid Data Layer:** Uses Supabase for remote data with intelligent mock fallbacks for local development or static hosting.  
 14 - **Modern UI/UX:** Smooth animations powered by `motion` and utility-first styling with Tailwind CSS.
15 - **Type-Safe Development:** Fully implemented in TypeScript for better maintainability.
16
17 ## Current Status
18 The project is currently in its initial release phase (`0.1.0`).
19 - [x] Core architecture and project structure established.
20 - [x] Profile and Projects data layers (Services/Hooks) fully implemented.
21 - [x] Responsive Home and Project Detail screens completed.
22 - [x] Supabase integration with fallback mechanism.
23 - [x] Markdown rendering for project documentation.
24
25 ## Technology Stack
26 - **React 19:** Leveraging the latest React features for building interactive UIs.
27 - **Vite:** Used for lightning-fast bundling and a superior developer experience.
28 - **TypeScript:** Ensuring structural integrity and type safety across the application.
29 - **Tailwind CSS:** For rapid, consistent, and maintainable styling.
30 - **Supabase:** Providing a scalable Backend-as-a-Service (BaaS) for project and profile management.
31 - **Motion:** For declarative and performant UI animations.
32 - **React Router Dom:** Standardized client-side routing.
33 - **React Markdown:** Enabling rich text and documentation within project views.
34
35 ## Architecture
36 The project follows a clean, decoupled architecture to ensure separation of concerns and testability.
37
38 ### Data Flow
39 The application strictly adheres to a unidirectional data flow:
40 `Component → Hook → Service → Database (Supabase)`
41
42 - **Components:** Focused strictly on presentation and user interaction.
43 - **Hooks:** Custom React hooks manage asynchronous state and orchestrate service calls.
44 - **Services:** Pure business logic and data fetching. This is the only layer that interacts with the Supabase client.
45 - **Supabase:** Acts as the primary data source, with hardcoded fallbacks in the services to ensure the app works out-of-the-box.
46
47 ## Project Structure
src/
├── app/ # Application entry points and routing
│ ├── screens/ # Full-page compositions (Home, Project Details)
│ └── router.tsx # Route definitions
├── components/ # Shared UI components and layout wrappers
│ ├── layout/ # Navbar, Footer, Section containers
│ └── ui/ # Atomic UI elements (Buttons, Badges, Cards)
├── features/ # Domain-specific logic (Feature-based)
│ ├── profile/ # Profile components, hooks, and services
│ └── projects/ # Project-specific logic and data handling
├── lib/ # External library configurations (Supabase client)
├── styles/ # Global CSS and Tailwind configurations
└── docs/ # Architectural documentation and analysis
1
2 ## Installation
3 To run this project locally, follow these steps:
4
5 1. **Clone the repository:**
git clone https://github.com/your-username/stitch-portfolio-generator.git
cd stitch-portfolio-generator
1
2 2. **Install dependencies:**
npm install
1
2 3. **Run the development server:**
npm run dev

    1
    2 4. **Connect to Supabase (Optional):**
    3    Create a `.env` file based on `.env.example` and provide your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
    4
    5 ## Usage
    6 - **Customizing Content:** Edit the fallback data in `src/features/projects/services/project.service.ts` and
      `src/features/profile/services/profile.service.ts` to see changes reflected immediately.
    7 - **Adding Projects:** Add your project images to `public/images/projects/` and update the service data.
    8 - **Styling:** Modify `tailwind.config.ts` or `src/styles/globals.css` to match your personal brand.
    9

10 ## Future Plans
11 - [ ] Dark Mode support with system preference detection.
12 - [ ] Blog/Journal feature for technical writing.
13 - [ ] Interactive 3D elements using Three.js/React Three Fiber.
14 - [ ] Advanced project filtering by technology stack or category.
15 - [ ] Automated CI/CD deployment pipeline.
16
17 ## Learning Goals
18 This project was built to demonstrate and master:
19 - **Clean Architecture:** Implementing a scalable "Feature-based" folder structure in React.
20 - **Service Isolation:** Keeping data fetching logic separate from UI components.
21 - **Modern Tooling:** Utilizing React 19 and Vite for cutting-edge frontend performance.
22 - **BaaS Integration:** Effectively managing a Headless CMS experience using Supabase.
23
24 ## Screenshots
25 _(Add your project screenshots here)_
26
27 | Home Page | Project Details |
28 | :---: | :---: |
29 | ![Home Page Placeholder](https://via.placeholder.com/800x450?text=Home+Page+Screenshot) | ![Project Details
      Placeholder](https://via.placeholder.com/800x450?text=Project+Details+Screenshot) |
30
31 ## License
32 This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
