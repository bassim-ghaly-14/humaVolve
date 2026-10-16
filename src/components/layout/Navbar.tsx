import { ROUTES } from '../../constants/routes';

/** Application header with primary navigation. */
export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="navbar__brand" href={ROUTES.HOME}>
          <img
            className="navbar__logo"
            src={`${import.meta.env.BASE_URL}huma-volve-logo.jpg`}
            alt="HumaVolve academy logo"
            width={32}
            height={32}
          />
          <span>HumaVolve</span>
        </a>
        <nav aria-label="Primary">
          <ul className="navbar__links">
            <li>
              <a href={ROUTES.HOME}>Home</a>
            </li>
            <li>
              <a href={ROUTES.ABOUT}>About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
