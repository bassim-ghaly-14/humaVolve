import { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Table, type Column } from '../ui/Table';
import { courses, type Course } from '../../data/courses';

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

const DEFAULT_STATUS = 'No button clicked yet. Try the showcase below.';

/**
 * Interactive Assignment 02 showcase (Button, Card, Table).
 * Local state only: status announcement, shared card demo state.
 * Rendered on the Assignment 02 details page; no longer hosted on the
 * HumaVolve landing page.
 */
export function Assignment02Showcase() {
  const [buttonStatus, setButtonStatus] = useState(DEFAULT_STATUS);
  const [enrolledCourse, setEnrolledCourse] = useState<string | null>(null);

  return (
    <div className="about-showcase">
      <section className="showcase" aria-labelledby="about-button-showcase">
        <h3 id="about-button-showcase">Button showcase</h3>
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
          onClick={() => setButtonStatus(DEFAULT_STATUS)}
        />
      </section>

      <section className="showcase" aria-labelledby="about-card-showcase">
        <h3 id="about-card-showcase">Card showcase</h3>
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

      <section className="showcase" aria-labelledby="about-table-showcase">
        <h3 id="about-table-showcase">Table showcase</h3>
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

      <section className="showcase" aria-labelledby="about-why-reusable">
        <h3 id="about-why-reusable">Why reusable components matter</h3>
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
    </div>
  );
}
