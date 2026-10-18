import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getAssignmentById, type FolderNode } from "../data/assignments";
import { ROUTES } from "../constants/routes";
import { EmptyState } from "../components/common/EmptyState";
import { AssignmentSubmissionSection } from "../components/about/AssignmentSubmissionSection";
import { Assignment02Showcase } from "../components/about/Assignment02Showcase";

function FolderTree({ nodes }: { nodes: FolderNode[] }) {
  return (
    <ul className="task-tree">
      {nodes.map((node) => (
        <li key={node.name}>
          <code>{node.name}</code>
          {node.children ? <FolderTree nodes={node.children} /> : null}
        </li>
      ))}
    </ul>
  );
}

/** Dedicated details page for a single assignment (Tasks 01-02 share one layout). */
export default function AssignmentDetails() {
  const { id } = useParams<{ id: string }>();
  const assignment = getAssignmentById(id);

  if (!assignment) {
    return (
      <main
        className="page page--wide about"
        aria-labelledby="assignment-missing">
        <Link className="products-back" to={ROUTES.HUMAVOLVE}>
          <ArrowLeft aria-hidden="true" size={16} /> Back to assignments
        </Link>
        <EmptyState
          title="Assignment not found"
          description={`“${id ?? ""}” does not match a known assignment. Return to the list and choose an assignment.`}
          action={
            <Link
              className="button button--secondary"
              to={ROUTES.HUMAVOLVE}
              id="assignment-missing">
              Browse assignments
            </Link>
          }
        />
      </main>
    );
  }

  return (
    <main
      className="page page--wide about task-details"
      aria-labelledby="task-details-title">
      <Link className="products-back" to={ROUTES.HUMAVOLVE}>
        <ArrowLeft aria-hidden="true" size={16} /> Back to assignments
      </Link>

      <p className="eyebrow">
        {assignment.course ? `${assignment.course} · ` : ""}
        {assignment.taskLabel} · {assignment.category}
      </p>
      <h1 id="task-details-title">{assignment.title}</h1>
      <p className="about-prose">{assignment.intro}</p>

      <section className="about-section" aria-labelledby="task-objective">
        <h2 id="task-objective">Objective</h2>
        <p className="about-prose">{assignment.objective}</p>
      </section>

      {assignment.figmaUrl ? (
        <section className="about-section" aria-labelledby="task-figma">
          <h2 id="task-figma">Figma Design</h2>
          <p className="about-prose">
            The original design is linked below as an external Figma reference
            for this task. It is provided for reference only and is not
            recreated or fetched inside HumaVolve.
          </p>
          <p className="task-url">
            <span>Design: </span>
            <a
              className="about-link"
              href={assignment.figmaUrl}
              target="_blank"
              rel="noopener noreferrer">
              Open Figma design <ExternalLink aria-hidden="true" size={15} />
            </a>
          </p>
          <p className="task-url">
            <span>URL: </span>
            <code>{assignment.figmaUrl}</code>
          </p>
        </section>
      ) : null}

      {assignment.technologies?.length ? (
        <section className="about-section" aria-labelledby="task-technologies">
          <h2 id="task-technologies">Required Technologies</h2>
          <ul className="task-list">
            {assignment.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {assignment.requirements ? (
        <section className="about-section" aria-labelledby="task-requirements">
          <h2 id="task-requirements">Task Requirements</h2>
          <ul className="task-list">
            {assignment.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {assignment.folderTree ? (
        <section className="about-section" aria-labelledby="task-structure">
          <h2 id="task-structure">Required Folder Structure</h2>
          <div className="task-tree-wrap">
            <FolderTree nodes={assignment.folderTree} />
          </div>
        </section>
      ) : null}

      {assignment.examples ? (
        <section className="about-section" aria-labelledby="task-examples">
          <h2 id="task-examples">Suggested Examples</h2>
          <dl className="task-examples">
            {assignment.examples.map((example) => (
              <div className="task-examples__row" key={example.path}>
                <dt>
                  <code>{example.path}</code>
                </dt>
                <dd>
                  <code>{example.files}</code>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {assignment.submissionSteps ? (
        <section className="about-section" aria-labelledby="task-github">
          <h2 id="task-github">GitHub Submission Instructions</h2>
          <ul className="task-list">
            {assignment.submissionSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          {assignment.submissionExampleUrl ? (
            <p className="task-url">
              <span>Format: </span>
              <code>{assignment.submissionExampleUrl}</code>
            </p>
          ) : null}
        </section>
      ) : null}

      {assignment.notes ? (
        <section className="about-section" aria-labelledby="task-notes">
          <h2 id="task-notes">Important Notes</h2>
          <ul className="task-list">
            {assignment.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {assignment.componentSections
        ? assignment.componentSections.map((component, index) => (
            <section
              key={component.title}
              className="about-section"
              aria-labelledby={`task-component-${assignment.id}-${index}`}>
              <h2 id={`task-component-${assignment.id}-${index}`}>
                {index + 1}. {component.title}
              </h2>
              <p className="about-prose">{component.intro}</p>
              <ul className="task-list">
                {component.props.map((prop) => (
                  <li key={prop.name}>
                    <code>{prop.name}</code>
                    {" — "}
                    {prop.description}
                  </li>
                ))}
              </ul>
              <p className="task-url">
                <span>Requirement: </span>
                {component.requirement}
              </p>
            </section>
          ))
        : null}

      {assignment.id === "02" && (
        <section className="about-section" aria-labelledby="task-live-showcase">
          <h2 id="task-live-showcase">Live Component Showcase</h2>
          <p className="about-prose">
            The Button, Card, and Table components described above are
            demonstrated below. Interactivity and state stay local to this
            showcase.
          </p>
          <Assignment02Showcase />
        </section>
      )}

      {assignment.endpoints?.length ? (
        <section className="about-section" aria-labelledby="task-endpoints">
          <h2 id="task-endpoints">API Endpoints</h2>
          <p className="about-prose">
            DummyJSON endpoints used by this assignment. URLs wrap so they stay
            readable on mobile.
          </p>
          {assignment.endpoints.map(({ purpose, endpoint }) => (
            <p className="task-url" key={purpose}>
              <span>{purpose}: </span>
              <a
                className="about-link"
                href={endpoint}
                target="_blank"
                rel="noopener noreferrer">
                <code>{endpoint}</code>
              </a>
            </p>
          ))}
        </section>
      ) : null}

      {assignment.expectedStructure?.length ? (
        <section
          className="about-section"
          aria-labelledby="task-page-structure">
          <h2 id="task-page-structure">Expected Page Structure</h2>
          <ul className="task-list">
            {assignment.expectedStructure.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {assignment.reactQueryExpectations?.length ? (
        <section className="about-section" aria-labelledby="task-react-query">
          <h2 id="task-react-query">React Query Expectations</h2>
          <ul className="task-list">
            {assignment.reactQueryExpectations.map((expectation) => (
              <li key={expectation}>{expectation}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {assignment.restrictions?.length ? (
        <section className="about-section" aria-labelledby="task-restrictions">
          <h2 id="task-restrictions">Important Restrictions</h2>
          <ul className="task-list">
            {assignment.restrictions.map((restriction) => (
              <li key={restriction}>{restriction}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {assignment.submissionRequirements?.length ? (
        <section
          className="about-section"
          aria-labelledby="task-submission-requirements">
          <h2 id="task-submission-requirements">Submission Requirements</h2>
          <ul className="task-list">
            {assignment.submissionRequirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {assignment.generalRequirements ? (
        <section className="about-section" aria-labelledby="task-general">
          <h2 id="task-general">General Requirements</h2>
          <ul className="task-list">
            {assignment.generalRequirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {assignment.closing ? (
        <p className="task-url">
          <span>{assignment.closing}</span>
        </p>
      ) : null}

      <AssignmentSubmissionSection assignment={assignment} />
    </main>
  );
}
