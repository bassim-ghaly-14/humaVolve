import { AssignmentCard } from '../assignments/AssignmentCard';
import { ASSIGNMENTS } from '../../data/assignments';

/** Assignment overview cards, reused as-is.
 *  Each card links to its assignment's details page, where the full
 *  specification and live demonstration live.
 */
export function HumaVolveAssignments() {
  return (
    <section className="about-section" aria-labelledby="about-assign">
      <h2 id="about-assign">Assignments</h2>
      <p className="about-prose">
        Completed assignments, from project structure to reusable components.
        Open an assignment to see its full description, objectives, and live
        component demonstration.
      </p>
      <div className="about-cards">
        {ASSIGNMENTS.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            headingId={`about-a${assignment.id}`}
          />
        ))}
      </div>
    </section>
  );
}
