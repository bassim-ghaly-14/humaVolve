import { type ChangeEvent, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

/**
 * Storefront navigation bar.
 *
 * - Crystal: brand link to the home route.
 * - Shop: link to the product listing; active state driven by NavLink so the
 *   active dot under "Shop" follows the actual route (refresh-safe).
 * - View Cart: link to the cart destination — the cart drawer lives on the
 *   Shop page (`/products`); no separate cart route exists in the app.
 * - Search: a single search input whose value lives in the URL `search`
 *   parameter, so the Shop listing can read it directly without duplicated
 *   state. Writes use `replace` so typing never clutters history.
 *
 * Responsive: links sit inline on tablet/desktop; below 640px they hide
 * behind a hamburger menu while the search field stays in the navbar row.
 */
export function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const query = searchParams.get('search') ?? '';

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    setSearchParams(params, { replace: true });
  };

  const clearSearch = (): void => {
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params, { replace: true });
  };

  const closeMenu = (): void => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink className="navbar__brand" to={ROUTES.HOME}>
          <img
            className="navbar__logo"
            src={`${import.meta.env.BASE_URL}huma-volve-logo.jpg`}
            alt="Crystal logo"
            width={32}
            height={32}
          />
          <span>Crystal</span>
        </NavLink>

        <nav aria-label="Primary">
          <ul className="navbar__links">
            <li>
              <NavLink
                to={ROUTES.PRODUCTS}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' shop-active' : ''}`
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.PRODUCTS} onClick={closeMenu} className="navbar__link">
                View Cart
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="navbar__controls">
          <label className="navbar__search" aria-label="Search products">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={onSearchChange}
              autoComplete="off"
              placeholder="Search products"
              aria-label="Search products"
            />
            {query ? (
              <button
                type="button"
                className="navbar__search__clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X size={16} aria-hidden="true" />
              </button>
            ) : null}
          </label>

          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="navbar-menu"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>

        <nav
          aria-label="Primary"
          id="navbar-menu"
          className={`navbar__menu${menuOpen ? ' navbar__menu--open' : ''}`}
        >
          <ul className="navbar__links">
            <li>
              <NavLink
                to={ROUTES.PRODUCTS}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' shop-active' : ''}`
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.PRODUCTS} onClick={closeMenu} className="navbar__link">
                View Cart
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

