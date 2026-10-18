import { type ChangeEvent, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { ROUTES } from "../../constants/routes";

/**
 * Crystal Store navigation bar.
 * Four sections: brand, primary links, search, View Cart.
 * Single instance rendered from App; pages must not duplicate it.
 * SHOP dot is route-driven via NavLink. Search uses the shared URL
 * `search` param consumed by the Shop page. View Cart opens the
 * existing Shop cart drawer via /shop?cart=open (no cart page exists).
 */
export function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const query = searchParams.get("search") ?? "";
  const onShopRoute =
    location.pathname === ROUTES.SHOP ||
    location.pathname.startsWith("/products");

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (onShopRoute) {
      const params = new URLSearchParams(searchParams);
      if (value) params.set("search", value);
      else params.delete("search");
      setSearchParams(params, { replace: true });
    } else {
      navigate(
        value
          ? `${ROUTES.SHOP}?search=${encodeURIComponent(value)}`
          : ROUTES.SHOP,
      );
    }
  };

  const closeMenu = (): void => setMenuOpen(false);
  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    `crystal-nav__link${isActive ? " crystal-nav__link--active" : ""}`;

  return (
    <div className="crystal-nav__page-wrap">
      <header className="crystal-nav" aria-label="Site navigation">
        <div className="crystal-nav__row">
          <Link
            className="crystal-nav__brand"
            to={ROUTES.HOME}
            aria-label="crystal — home">
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="crystal-nav__brand-icon">
              <g clipPath="url(#clip0_1_49)">
                <path
                  d="M19 3H5L2 9L12 21L22 9L19 3ZM9.62 8L11.12 5H12.88L14.38 8H9.62ZM11 10V16.68L5.44 10H11ZM13 10H18.56L13 16.68V10ZM19.26 8H16.61L15.11 5H17.76L19.26 8ZM6.24 5H8.89L7.39 8H4.74L6.24 5Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_49">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="crystal-nav__brand-text">crystal.</span>
          </Link>
          <nav aria-label="Primary" className="crystal-nav__primary">
            <ul className="crystal-nav__links">
              <li>
                <NavLink
                  to={ROUTES.SHOP}
                  onClick={closeMenu}
                  className={`crystal-nav__link${onShopRoute ? " crystal-nav__link--active" : ""}`}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.COLLECTIONS}
                  onClick={closeMenu}
                  className={linkClass}>
                  Collections
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.CONTACT}
                  onClick={closeMenu}
                  className={linkClass}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.ABOUT}
                  onClick={closeMenu}
                  className={linkClass}>
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="crystal-nav__search" role="search">
            <label
              className="crystal-nav__search-box"
              htmlFor="crystal-nav-search">
              <span className="crystal-nav__sr-only">Search products</span>
              <input
                id="crystal-nav-search"
                type="search"
                value={query}
                onChange={onSearchChange}
                autoComplete="off"
                placeholder="SEARCH"
                aria-label="Search products"
              />
              <Search
                size={16}
                aria-hidden="true"
                className="crystal-nav__search-icon"
              />
            </label>
          </div>
          <Link
            className="crystal-nav__cart"
            to={`${ROUTES.SHOP}?cart=open`}
            aria-label="View cart">
            <ShoppingCart size={16} aria-hidden="true" />
            <span>View Cart</span>
          </Link>
          <button
            type="button"
            className="crystal-nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="crystal-nav-menu"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu">
            {menuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
        <div
          id="crystal-nav-menu"
          className={`crystal-nav__mobile${menuOpen ? " crystal-nav__mobile--open" : ""}`}>
          <nav aria-label="Primary mobile">
            <ul className="crystal-nav__links crystal-nav__links--mobile">
              <li>
                <NavLink
                  to={ROUTES.SHOP}
                  onClick={closeMenu}
                  className={`crystal-nav__link${onShopRoute ? " crystal-nav__link--active" : ""}`}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.COLLECTIONS}
                  onClick={closeMenu}
                  className={linkClass}>
                  Collections
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.CONTACT}
                  onClick={closeMenu}
                  className={linkClass}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.ABOUT}
                  onClick={closeMenu}
                  className={linkClass}>
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
          <div
            className="crystal-nav__search crystal-nav__search--mobile"
            role="search">
            <label
              className="crystal-nav__search-box"
              htmlFor="crystal-nav-search-mobile">
              <span className="crystal-nav__sr-only">Search products</span>
              <input
                id="crystal-nav-search-mobile"
                type="search"
                value={query}
                onChange={onSearchChange}
                autoComplete="off"
                placeholder="SEARCH"
                aria-label="Search products"
              />
              <Search
                size={16}
                aria-hidden="true"
                className="crystal-nav__search-icon"
              />
            </label>
          </div>
        </div>
      </header>
    </div>
  );
}
