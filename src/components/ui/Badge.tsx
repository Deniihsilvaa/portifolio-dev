type BadgeProps = {
  label: string;
};

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-flex rounded-full border hairline-card bg-[rgba(17,24,39,0.04)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-on-card">
      {label}
    </span>
  );
}
