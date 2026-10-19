import type { ReactNode } from "react";
import { Clock3 } from "lucide-react";

export interface PlaceholderPageProps {
  title: string;
  message?: string;
  icon?: ReactNode;
}

export default function PlaceholderPage({
  title,
  message = "This page is coming soon.",
  icon,
}: PlaceholderPageProps) {
  return (
    <main className="page" aria-label={title}>
      <section
        aria-labelledby="placeholder-heading"
        className="mx-auto flex min-h-[320px] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <div
          aria-hidden="true"
          className="mb-6 flex size-14 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
          {icon ?? <Clock3 size={25} strokeWidth={1.6} />}
        </div>

        <span className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          Coming soon
        </span>

        <h1
          id="placeholder-heading"
          className="text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl">
          {title}
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
          {message}
        </p>
      </section>
    </main>
  );
}
