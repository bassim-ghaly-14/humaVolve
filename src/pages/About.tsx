import { Link } from 'react-router-dom';
import { ArrowRight, CircleCheck, Folder, Layers, ShoppingBag } from 'lucide-react';
import { Assignment02Showcase } from '../components/about/Assignment02Showcase';
import { AssignmentSubmissionSection } from '../components/about/AssignmentSubmissionSection';
import { ROUTES } from '../constants/routes';

/** About page: workspace intro plus showcase of Assignments 01-03. */
export default function About() {
  return (
    <main className="page page--wide about" aria-labelledby="about-heading">
      <section className="about-hero" aria-labelledby="about-heading">
        <p className="eyebrow">HumaVolve · Internship workspace</p>
        <h1 id="about-heading">About HumaVolve</h1>
        <p className="about-lede">
          HumaVolve is a shared frontend training workspace: one consistently
          organized repository where practical assignments are implemented,
          reviewed, and built upon over time. This page shows the first three
          completed assignments as one engineering journey.
        </p>
        <div className="about-meta">
          <p className="about-count">
            <CircleCheck aria-hidden="true" size={16} />3 assignments
            documented
          </p>
          <ol className="about-steps" aria-label="Documented assignments">
            <li>
              <span className="about-steps__num" aria-hidden="true">
                01
              </span>
              Project structure
            </li>
            <li>
              <span className="about-steps__num" aria-hidden="true">
                02
              </span>
              Reusable components
            </li>
            <li>
              <span className="about-steps__num" aria-hidden="true">
                03
              </span>
              Products page
            </li>
          </ol>
        </div>
      </section>
      <section className="about-section" aria-labelledby="about-overview">
        <h2 id="about-overview">Project overview</h2>
        <p className="about-prose">
          The repository grows without restructuring. Each assignment lands in
          the same codebase and reuses the foundation before it. The
          interactive Assignment 02 showcase lives below, and Products builds
          on the same typed-module conventions.
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
      <section className="about-section" aria-labelledby="about-assign">
        <h2 id="about-assign">Assignment showcase</h2>
        <p className="about-prose">
          Three completed tasks, from foundation to data-driven UI. Details
          below match what is implemented and verified in this repository.
        </p>
        <div className="about-cards">
          <article className="about-card" aria-labelledby="about-a01">
            <div className="about-card__top">
              <p className="about-card__kicker">
                <Folder aria-hidden="true" size={16} />
                Assignment 01
              </p>
              <p className="about-status">
                <CircleCheck aria-hidden="true" size={14} />
                Completed
              </p>
            </div>
            <h3 id="about-a01">React Project Structure</h3>
            <p>
              Established the React, TypeScript and Vite foundation with
              organized source directories for components, pages, hooks, API,
              types, schemas, utilities, and related concerns.
            </p>
            <ul className="about-tags" aria-label="Assignment 01 tech">
              <li>
                <span className="badge">React 19</span>
              </li>
              <li>
                <span className="badge">TypeScript</span>
              </li>
              <li>
                <span className="badge">Vite</span>
              </li>
              <li>
                <span className="badge">ESLint</span>
              </li>
            </ul>
            <p className="about-card__meta">Completed · October 14, 2026</p>
          </article>
          <article className="about-card" aria-labelledby="about-a02">
            <div className="about-card__top">
              <p className="about-card__kicker">
                <Layers aria-hidden="true" size={16} />
                Assignment 02
              </p>
              <p className="about-status">
                <CircleCheck aria-hidden="true" size={14} />
                Completed
              </p>
            </div>
            <h3 id="about-a02">Reusable React Components</h3>
            <p>
              Added prop-driven <code>Button</code>, <code>Card</code>, and{' '}
              <code>Table</code> components with course data. The legacy APIs
              remain preserved and untouched.
            </p>
            <ul className="about-api" aria-label="Preserved component API">
              <li>
                <code>Button</code> — <code>text</code>,{' '}
                <code>variant</code>, <code>disabled</code>
              </li>
              <li>
                <code>Card</code> — <code>title</code>,{' '}
                <code>description</code>, <code>image?</code>
              </li>
              <li>
                <code>Table</code> — <code>columns</code>,{' '}
                <code>data</code>, <code>striped?</code>
              </li>
            </ul>
            <p className="about-card__meta">Completed · October 15, 2026</p>
            <div className="about-card__action">
              <a className="about-link" href="#about-a02-live">
                Skip to the live showcase
                <ArrowRight aria-hidden="true" size={15} />
              </a>
            </div>
          </article>
          <article className="about-card" aria-labelledby="about-a03">
            <div className="about-card__top">
              <p className="about-card__kicker">
                <ShoppingBag aria-hidden="true" size={16} />
                Assignment 03
              </p>
              <p className="about-status">
                <CircleCheck aria-hidden="true" size={14} />
                Completed
              </p>
            </div>
            <h3 id="about-a03">Products Page</h3>
            <p>
              Built a catalog on the DummyJSON products API with TanStack
              React Query: listing and details, debounced server search, and
              server-driven pagination with loading and error states.
            </p>
            <ul className="about-api" aria-label="Assignment 03 highlights">
              <li>Search with 350 ms debounce; page resets per query</li>
              <li>
                Pages via <code>limit</code> and <code>skip</code>
              </li>
              <li>Hash routing for GitHub Pages compatibility</li>
            </ul>
            <ul className="about-tags" aria-label="Assignment 03 tech">
              <li>
                <span className="badge">React Query</span>
              </li>
              <li>
                <span className="badge">DummyJSON</span>
              </li>
              <li>
                <span className="badge">Tailwind v4</span>
              </li>
              <li>
                <span className="badge">HashRouter</span>
              </li>
            </ul>
            <p className="about-card__meta">Completed · October 17, 2026</p>
            <p className="about-card__action">
              <Link className="about-link" to={ROUTES.PRODUCTS}>
                Browse the products catalog
                <ArrowRight aria-hidden="true" size={15} />
              </Link>
            </p>
          </article>
        </div>
      </section>
      <section className="about-section" aria-labelledby="about-a02-live">
        <h2 id="about-a02-live">Assignment 02 — Live showcase</h2>
        <p className="about-prose">
          The same reusable Button, Card, and Table components, demonstrated
          with course data. State stays local to this showcase.
        </p>
        <Assignment02Showcase />
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
              <li>Hand-written CSS with dark mode</li>
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
        <p className="about-note">
          React Query and Tailwind arrived with Task 03 only.
        </p>
      </section>
      <section className="about-closing" aria-labelledby="about-next">
        <h2 id="about-next">Keep exploring the workspace</h2>
        <p>
          HumaVolve grows one focused assignment at a time. See the latest
          work in the catalog, or start from the landing page.
        </p>
        <div className="button-row">
          <Link className="button button--primary" to={ROUTES.PRODUCTS}>
            Browse products
          </Link>
          <Link className="button button--secondary" to={ROUTES.HOME}>
            Back to home
          </Link>
        </div>
      </section>
      <AssignmentSubmissionSection />
    </main>
  );
}

