import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

/**
 * Floating circular Academy launcher.
 * Mounted once inside HashRouter in App. Uses the existing
 * `public/huma-volve-logo.jpg` asset via BASE_URL, navigates to
 * ROUTES.HUMAVOLVE with the existing router. No dependencies added.
 */
export function AcademyLauncher() {
  return (
    <Link
      to={ROUTES.HUMAVOLVE}
      className="academy-launcher"
      aria-label="Open the HumaVolve page"
      title="HumaVolve page"
    >
      <img
        src={`${import.meta.env.BASE_URL}huma-volve-logo.jpg`}
        alt=""
        aria-hidden="true"
        width={56}
        height={56}
        loading="lazy"
      />
    </Link>
  );
}
