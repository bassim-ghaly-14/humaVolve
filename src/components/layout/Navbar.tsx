import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

/** Application header with primary navigation. */
export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link className="navbar__brand" to={ROUTES.PRODUCTS}>
          <img
            className="navbar__logo"
            src={`${import.meta.env.BASE_URL}huma-volve-logo.jpg`}
            alt="HumaVolve academy logo"
            width={32}
            height={32}
          />
          <span>HumaVolve</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="navbar__links">
            <li>
              <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.PRODUCTS}>Products</Link>
            </li>
            <li>
              <Link to={ROUTES.ABOUT}>About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

