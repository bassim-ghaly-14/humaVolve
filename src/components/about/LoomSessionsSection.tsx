import { ExternalLink, Video } from 'lucide-react';

type LoomSession = {
  label: string;
  url: string;
};

const LOOM_SESSIONS: Array<LoomSession> = [
  {
    label: 'Session 1',
    url: 'https://www.loom.com/share/b8ac74b4c0574a0595ffcbe05b8cebee',
  },
  {
    label: 'Session 2',
    url: 'https://www.loom.com/share/caf47fc389ba4631be89d73a85ece1ba',
  },
  {
    label: 'Session 3',
    url: 'https://www.loom.com/share/77183128ec7243289ed2b8ba598d27f5',
  },
  {
    label: 'Session 4',
    url: 'https://www.loom.com/share/5209b6bf1ded401fab59e9ff5841b6f3',
  },
];

/**
 * Standalone Loom walkthrough sessions for the About page.
 * Rendered immediately before <AssignmentSubmissionSection />.
 * Reuses existing `about-section` / `about-cards` / `about-card` styles;
 * no page-specific CSS. Session labels are neutral because no verified
 * descriptive titles exist in the project sources; URLs are the source
 * of truth provided for this implementation.
 */
export function LoomSessionsSection() {
  return (
    <section className="about-section" aria-labelledby="about-loom">
      <h2 id="about-loom">Loom walkthrough sessions</h2>
      <p className="about-prose">
        Recorded walkthroughs for this workspace. Each session opens in a
        new tab on Loom.
      </p>
      <div className="about-cards">
        {LOOM_SESSIONS.map((session, index) => (
          <article
            key={session.url}
            className="about-card"
            aria-labelledby={`about-loom-${index + 1}`}
          >
            <div className="about-card__top">
              <p className="about-card__kicker">
                <Video aria-hidden="true" size={16} />
                Loom session
              </p>
            </div>
            <h3 id={`about-loom-${index + 1}`}>{session.label}</h3>
            <p className="about-card__action">
              <a
                className="about-link"
                href={session.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch {session.label} on Loom
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
