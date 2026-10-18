import { ExternalLink } from 'lucide-react';
import type { Assignment } from '../../data/assignments';

const ASSIGNMENT_FORM_URL =
  'https://docs.google.com/forms/d/174UVPwjb_gxthYSl2uwAO50Cg2ZIIKq9hl2yytqGabg/viewform';

export interface AssignmentSubmissionSectionProps {
  /** Optional task context. Only affects the heading; the form stays shared. */
  assignment?: Assignment;
}

/**
 * Shared assignment submission call-to-action.
 * Used unchanged on the HumaVolve list page, and reused at the bottom of
 * each assignment details page. Links to the existing Google Form; there is
 * no submission backend in this project.
 */
export function AssignmentSubmissionSection({ assignment }: AssignmentSubmissionSectionProps = {}) {
  const heading = assignment
    ? `Submit Your ${assignment.taskLabel.replace('Task', 'Assignment')}`
    : 'Ready to Submit Your Assignments?';
  return (
    <section className="about-closing" aria-labelledby="about-submit">
      <h2 id="about-submit">{heading}</h2>
      <p>Complete your assignment submission through the form below.</p>
      <div className="button-row">
        <a
          className="button button--primary"
          href={ASSIGNMENT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          Submit Your Assignments
          <ExternalLink aria-hidden="true" size={16} />
        </a>
      </div>
    </section>
  );
}
