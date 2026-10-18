import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Assignment } from '../../data/assignments';
import { assignmentDetail } from '../../constants/routes';

export interface AssignmentCardProps {
  assignment: Assignment;
  headingId: string;
}

/**
 * Concise assignment summary card.
 * Shows only the summary + View Details action; full spec lives on the
 * dedicated details page at assignmentDetail(id). When an assignment
 * provides `course`, it is included in the same kicker line so both
 * assignments share one visual treatment.
 */
export function AssignmentCard({ assignment, headingId }: AssignmentCardProps) {
  const kicker = assignment.course
    ? `${assignment.course} · ${assignment.taskLabel} · ${assignment.category}`
    : `${assignment.taskLabel} · ${assignment.category}`;
  return (
    <article className="about-card about-card--assignment" aria-labelledby={headingId}>
      <p className="about-card__kicker">{kicker}</p>
      <h3 id={headingId}>{assignment.title}</h3>
      <p>{assignment.shortDescription}</p>
      <p className="about-card__action">
        <Link
          className="about-link"
          to={assignmentDetail(assignment.id)}
          aria-label={`View details for ${assignment.title}`}
        >
          View Details
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </p>
    </article>
  );
}
