import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type ButtonLinkProps = PropsWithChildren<{
  to: string;
  variant?: "primary" | "ghost";
}>;

export function ButtonLink({
  children,
  to,
  variant = "primary",
}: ButtonLinkProps) {
  const className =
    variant === "primary"
      ? "bg-[var(--color-text-dark)] text-[var(--color-card-strong)] hover:-translate-y-0.5 hover:bg-black"
      : "border hairline-card surface-card text-on-card hover:-translate-y-0.5";

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${className}`}
    >
      {children}
    </Link>
  );
}
