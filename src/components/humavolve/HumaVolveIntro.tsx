import { HumaVolveHero } from './HumaVolveHero';

/**
 * Top of the HumaVolve page: the single original hero.
 * The previously introduced separate "Where to start" image-and-text
 * section has been removed — the page must contain only one hero, with
 * the Cloudinary image + text overlay living in HumaVolveHero.
 */
export function HumaVolveIntro() {
  return <HumaVolveHero />;
}
