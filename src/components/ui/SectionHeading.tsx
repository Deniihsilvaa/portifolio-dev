type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  theme?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  theme = "light",
}: SectionHeadingProps) {
  const titleClass = theme === "dark" ? "text-on-dark" : "text-on-card";
  const descriptionClass = theme === "dark" ? "text-muted-on-dark" : "text-muted-on-card";

  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">
        {eyebrow}
      </p>
      <h2 className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${titleClass}`}>
        {title}
      </h2>
      <p className={`text-base leading-7 ${descriptionClass}`}>{description}</p>
    </div>
  );
}
