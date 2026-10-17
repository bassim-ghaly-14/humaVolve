import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

/** Landing page: concise HumaVolve introduction with entry points. */
export default function Home() {
  return (
    <main className="page" aria-labelledby="home-title">
      <section className="page__hero" aria-labelledby="home-title">
        <p className="eyebrow">HumaVolve internship training</p>
        <h1 id="home-title">Build consistent interfaces</h1>
        <p>
          HumaVolve is a shared frontend training workspace where assignments
          grow into a real codebase.
        </p>
        <div className="button-row">
          <Link className="button button--primary" to={ROUTES.PRODUCTS}>
            Browse products
          </Link>
          <Link className="button button--secondary" to={ROUTES.ABOUT}>
            About the workspace
          </Link>
        </div>
      </section>

      <section className="showcase" aria-labelledby="home-path">
        <h2 id="home-path">Where to start</h2>
        <p className="showcase__intro">
          See how the workspace is organized, then explore the catalog.
        </p>
        <ul>
          <li>
            <strong>About</strong> documents Assignments 01 to 03.
          </li>
          <li>
            <strong>Products</strong> shows search, pagination, and details.
          </li>
        </ul>
      </section>
    </main>
  );
}
