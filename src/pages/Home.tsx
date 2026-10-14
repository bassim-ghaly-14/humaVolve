import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/skeleton/LoadingSkeleton';

type LoadState = 'idle' | 'loading' | 'ready';

/** Landing page introducing the HumaVolve training workspace. */
export default function Home() {
  const [showStructure, setShowStructure] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>('idle');

  // Simulated async request used only to demonstrate the loading and empty
  // states. No network call is made.
  useEffect(() => {
    if (loadState !== 'loading') return;

    const timer = setTimeout(() => setLoadState('ready'), 800);
    return () => clearTimeout(timer);
  }, [loadState]);

  return (
    <main className="page">
      <section className="page__hero">
        <h1>Welcome to HumaVolve</h1>
        <p>
          This is the ongoing internship training workspace. Task 01 established
          this clean, scalable React + TypeScript + Vite foundation that future
          assignments will build upon.
        </p>
        <Button onClick={() => setShowStructure((value) => !value)}>
          {showStructure ? 'Hide project structure' : 'Show project structure'}
        </Button>
      </section>

      {showStructure ? (
        <section className="page__structure" aria-label="Project structure">
          <h2>Project structure</h2>
          <ul>
            <li>
              <code>components</code> — reusable UI, layout, providers,
              skeletons and common pieces.
            </li>
            <li>
              <code>hooks</code> — reusable React hooks.
            </li>
            <li>
              <code>api</code> — typed data-access modules.
            </li>
            <li>
              <code>types</code>, <code>schemas</code>, <code>utils</code>,{' '}
              <code>constants</code> — shared foundations.
            </li>
            <li>
              <code>pages</code>, <code>store</code>, <code>i18n</code>,{' '}
              <code>assets</code> — app-level concerns.
            </li>
          </ul>
        </section>
      ) : null}

      <section className="page__demo" aria-label="Reusable component examples">
        <h2>Reusable component examples</h2>
        <Button variant="secondary" onClick={() => setLoadState('loading')}>
          Load example
        </Button>

        {loadState === 'loading' ? <LoadingSkeleton lines={4} /> : null}

        {loadState === 'ready' ? (
          <EmptyState
            title="No data to display"
            description="This example shows the reusable EmptyState component after a simulated load."
            action={
              <Button variant="secondary" onClick={() => setLoadState('idle')}>
                Reset
              </Button>
            }
          />
        ) : null}
      </section>
    </main>
  );
}
