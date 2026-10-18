/** Small reusable placeholder for routes that have no real content yet. */
export interface PlaceholderPageProps {
  title: string;
  message?: string;
}

export default function PlaceholderPage({
  title,
  message = 'This page is coming soon.',
}: PlaceholderPageProps) {
  return (
    <main className="page" aria-label={title}>
      <h1>{title}</h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>{message}</p>
    </main>
  );
}
