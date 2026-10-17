import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

/**
 * Application header with primary navigation.
 * NavLink supplies the active state + aria-current="page" automatically.
 * `end` on Home/About prevents "/" from matching everything;
 * Products intentionally stays active for "/products/:id" details.
 */
export function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'navbar__link is-active' : 'navbar__link';

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink className="navbar__brand" to={ROUTES.PRODUCTS}>
          <img
            className="navbar__logo"
            src={`${import.meta.env.BASE_URL}huma-volve-logo.jpg`}
            alt="HumaVolve academy logo"
            width={32}
            height={32}
          />
          <span>HumaVolve</span>
        </NavLink>
        <nav aria-label="Primary">
          <ul className="navbar__links">
            <li>
              <NavLink to={ROUTES.HOME} end className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.PRODUCTS} className={linkClass}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.ABOUT} end className={linkClass}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

