import { ExternalLink } from 'lucide-react';

const ASSIGNMENT_FORM_URL =
  'https://docs.google.com/forms/d/174UVPwjb_gxthYSl2uwAO50Cg2ZIIKq9hl2yytqGabg/viewform';

/**
 * Standalone assignment submission call-to-action.
 * Rendered last on the About page, immediately after <LoomSessionsSection />.
 * Reuses existing `about-closing` / `button` styles; no page-specific CSS.
 */
export function AssignmentSubmissionSection() {
  return (
    <section className="about-closing" aria-labelledby="about-submit">
      <h2 id="about-submit">Ready to Submit Your Assignments?</h2>
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
