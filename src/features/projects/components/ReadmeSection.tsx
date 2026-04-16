import ReactMarkdown from "react-markdown";

type ReadmeSectionProps = {
  markdown: string;
};

export function ReadmeSection({ markdown }: ReadmeSectionProps) {
  return (
    <section className="surface-card rounded-[2rem] p-8 shadow-card">
      <div className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">
          README Rendering
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-on-card">
          Project documentation
        </h2>
      </div>
      <article className="prose-readme max-w-none space-y-4 text-base leading-7 text-muted-on-card">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    </section>
  );
}
