Follow a clean and scalable React project structure using Vite and TypeScript.

The project must be organized by responsibilities and feature modules.

Folder rules:

src/

app/
Responsible for application bootstrap and routing configuration.

components/
Reusable UI components shared across the application.

components/ui/
Generic visual components such as Button, Card, Modal, Input.

components/layout/
Layout components like Navbar, Footer, PageContainer.

features/
Domain-based modules.

Each feature must contain its own:

- components
- hooks
- services
- types

Example:

features/projects/
components/
hooks/
services/
types/

hooks/
Global reusable hooks.

lib/
External integrations and configuration such as Supabase client.

styles/
Global styles and Tailwind configuration.

utils/
Utility helper functions.

Services must be the only layer that communicates with the database.

Hooks must handle application logic and call services.

UI components must only render visual elements and receive data via props.
