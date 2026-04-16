export function Footer() {
  return (
    <footer className="mt-12 border-t hairline-dark bg-[rgba(8,9,13,0.6)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-on-dark sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p>Built with React, Vite, Tailwind, and Supabase-ready services.</p>
        <p>Architecture: Component -&gt; Hook -&gt; Service -&gt; Supabase</p>
      </div>
    </footer>
  );
}
