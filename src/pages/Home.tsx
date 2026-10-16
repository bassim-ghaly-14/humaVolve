import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Table, type Column } from '../components/ui/Table';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/skeleton/LoadingSkeleton';
import { courses, type Course } from '../data/courses';

type LoadState = 'idle' | 'loading' | 'ready';

const courseColumns: Array<Column<Course>> = [
  { header: 'Course', key: 'name' },
  { header: 'Level', key: 'level' },
  { header: 'Lessons', key: 'lessons' },
  {
    header: 'Status',
    key: 'status',
    render: (value) => <span className="badge">{String(value)}</span>,
  },
];

/** Home page demonstrating Assignment 02 reusable components. */
export default function Home() {
  const [showStructure, setShowStructure] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>('idle');
  const [buttonStatus, setButtonStatus] = useState(
    'No button clicked yet. Try the showcase below.',
  );
  const [enrolledCourse, setEnrolledCourse] = useState<string | null>(null);

  // Simulated async request used only to demonstrate the loading and empty
  // states. No network call is made.
  useEffect(() => {
    if (loadState !== 'loading') return;

    const timer = setTimeout(() => setLoadState('ready'), 800);
    return () => clearTimeout(timer);
  }, [loadState]);

  return (
    <main className="page">
      <section className="page__hero" aria-labelledby="assignment-title">
        <p className="eyebrow">HumaVolve internship training</p>
        <h1 id="assignment-title">Assignment 02 — Reusable Components</h1>
        <p>
          Reusable components are small, prop-driven building blocks. The same
          component renders different content when given different props, which
          keeps the UI consistent and easy to maintain. This page demonstrates
          three reusable components: <strong>Button</strong>,{' '}
          <strong>Card</strong>, and <strong>Table</strong>.
        </p>
        <Button
          text={showStructure ? 'Hide project structure' : 'Show project structure'}
          variant="secondary"
          onClick={() => setShowStructure((value) => !value)}
        />
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

      <section className="showcase" aria-labelledby="button-showcase">
        <h2 id="button-showcase">Button showcase</h2>
        <p className="showcase__intro">
          The same <code>Button</code> component renders primary, secondary,
          danger, and disabled states through props.
        </p>
        <div className="button-row">
          <Button
            text="Save progress"
            variant="primary"
            onClick={() => setButtonStatus('Progress saved with the primary action.')}
          />
          <Button
            text="Preview"
            variant="secondary"
            onClick={() => setButtonStatus('Preview opened with the secondary action.')}
          />
          <Button
            text="Delete draft"
            variant="danger"
            onClick={() => setButtonStatus('Draft deleted with the danger action.')}
          />
          <Button
            text="Disabled action"
            variant="secondary"
            disabled
            onClick={() => setButtonStatus('This should never appear.')}
          />
        </div>
        <p className="status" role="status" aria-live="polite">
          {buttonStatus}
        </p>
        <Button
          text="Reset message"
          variant="secondary"
          onClick={() =>
            setButtonStatus('No button clicked yet. Try the showcase below.')
          }
        />
      </section>

      <section className="showcase" aria-labelledby="card-showcase">
        <h2 id="card-showcase">Card showcase</h2>
        <p className="showcase__intro">
          Each <code>Card</code> receives its own title, description, and
          optional image. Nested <code>children</code> render inside the body.
        </p>
        <div className="card-grid">
          <Card
            title="React Fundamentals"
            description="Learn how reusable components simplify development, one prop at a time."
            image="https://huma-volve.com/guest/assets/images/hero-image.jpg?v=1785912949"
            imageAlt="Hero image for the React Fundamentals card"
          >
            <p className="card__meta">8 lessons · Beginner friendly</p>
            <Button
              text={enrolledCourse === 'React Fundamentals' ? 'Enrolled ✓' : 'Explore Course'}
              variant="primary"
              onClick={() => {
                setEnrolledCourse('React Fundamentals');
                setButtonStatus('Explored React Fundamentals from inside a Card.');
              }}
            />
          </Card>
          <Card
            title="TypeScript Props and State"
            description="Practice explicit prop types, safe state updates, and predictable UIs."
          >
            <p className="card__meta">
              {enrolledCourse
                ? `Currently exploring: ${enrolledCourse}`
                : 'Pick a card action to update this shared demo state.'}
            </p>
            <Button
              text="View syllabus"
              variant="secondary"
              onClick={() => setButtonStatus('Syllabus requested from the second Card.')}
            />
          </Card>
        </div>
      </section>

      <section className="showcase" aria-labelledby="table-showcase">
        <h2 id="table-showcase">Table showcase</h2>
        <p className="showcase__intro">
          The generic <code>Table</code> renders any object-based dataset from{' '}
          <code>columns</code> and <code>data</code> props. Striped rows are
          enabled here with <code>striped</code>.
        </p>
        <Table<Course>
          columns={courseColumns}
          data={courses}
          striped
          caption="Internship courses and their current status"
        />
      </section>

      <section className="showcase" aria-labelledby="learning-note">
        <h2 id="learning-note">Why reusable components matter</h2>
        <ul>
          <li>
            <strong>Consistency:</strong> one Button or Card implementation keeps
            styling and behavior uniform everywhere.
          </li>
          <li>
            <strong>Reuse:</strong> props let the same component serve many pages
            without duplication.
          </li>
          <li>
            <strong>Maintainability:</strong> a fix in one file improves every
            usage at once.
          </li>
          <li>
            <strong>Separation of concerns:</strong> generic UI components stay
            simple, while pages own data and demonstration logic.
          </li>
        </ul>
      </section>

      <section className="page__demo" aria-label="Assignment 01 foundation">
        <h2>Assignment 01 foundation</h2>
        <Button
          text="Load example"
          variant="secondary"
          onClick={() => setLoadState('loading')}
        />

        {loadState === 'loading' ? <LoadingSkeleton lines={4} /> : null}

        {loadState === 'ready' ? (
          <EmptyState
            title="No data to display"
            description="This example shows the reusable EmptyState component after a simulated load."
            action={
              <Button
                text="Reset"
                variant="secondary"
                onClick={() => setLoadState('idle')}
              />
            }
          />
        ) : null}
      </section>
    </main>
  );
}
