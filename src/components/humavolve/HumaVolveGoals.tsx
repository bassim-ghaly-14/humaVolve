/** Goals, philosophy, and technology overview reused from About content. */
export function HumaVolveGoals() {
  return (
    <>
      <section className="about-section" aria-labelledby="about-overview">
        <h2 id="about-overview">Academy goals and learning philosophy</h2>
        <p className="about-prose">
          The repository grows without restructuring. Each assignment lands in
          the same codebase and reuses the foundation before it. Assignment
          showcases live on their details pages, and Products builds on the same
          typed-module conventions.
        </p>
        <ul className="about-approach">
          <li>
            <strong>React and TypeScript</strong>
            <span>Typed components, hooks, schemas, API boundaries.</span>
          </li>
          <li>
            <strong>Reusable components and structure</strong>
            <span>Prop-driven UI in organized, predictable folders.</span>
          </li>
          <li>
            <strong>API integration and server state</strong>
            <span>Validated fetch modules, React Query from Task 03.</span>
          </li>
          <li>
            <strong>Responsive UI and experience</strong>
            <span>Mobile-first layouts, loading and empty states.</span>
          </li>
          <li>
            <strong>Incremental verification</strong>
            <span>Each task builds on the last; build and lint pass.</span>
          </li>
        </ul>
      </section>
      <section className="about-section" aria-labelledby="about-tech">
        <h2 id="about-tech">Technology overview</h2>
        <p className="about-prose">
          What powers the workspace, and when each piece arrived.
        </p>
        <div className="about-tech">
          <div className="about-tech__panel">
            <h3>Foundation · Tasks 01-02</h3>
            <ul>
              <li>React 19 with TypeScript</li>
              <li>Vite builds and dev server</li>
              <li>Hand-written light-only CSS</li>
              <li>ESLint verification</li>
            </ul>
          </div>
          <div className="about-tech__panel">
            <h3>Introduced in Task 03</h3>
            <ul>
              <li>TanStack React Query server state</li>
              <li>React Router with HashRouter</li>
              <li>Tailwind CSS v4</li>
              <li>DummyJSON products API</li>
              <li>shadcn-style Card composition</li>
              <li>lucide-react icons</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
