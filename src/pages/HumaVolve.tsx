import { HumaVolveIntro } from '../components/humavolve/HumaVolveIntro';
import { HumaVolveGoals } from '../components/humavolve/HumaVolveGoals';
import { LoomSessionsSection } from '../components/about/LoomSessionsSection';
import { HumaVolveAssignments } from '../components/humavolve/HumaVolveAssignments';
import { AssignmentSubmissionSection } from '../components/about/AssignmentSubmissionSection';

/** Dedicated HumaVolve destination for the floating academy launcher. */
export default function HumaVolve() {
  return (
    <main className="page page--wide about" aria-label="HumaVolve">
      <HumaVolveIntro />
      <HumaVolveGoals />
      <LoomSessionsSection />
      <HumaVolveAssignments />
      <AssignmentSubmissionSection />
    </main>
  );
}
