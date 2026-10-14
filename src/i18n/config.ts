import en from './en.json';

/**
 * Minimal internationalization starting point.
 *
 * This is intentionally NOT a full i18n system and no i18n library is
 * installed for this structure-only task. The module simply exposes the
 * available locales and a tiny translation helper so a future assignment can
 * replace it with a complete solution (for example react-i18next) without
 * touching the rest of the app.
 */

export const DEFAULT_LOCALE = 'en' as const;

export const LOCALES = {
  en,
} as const;

export type Locale = keyof typeof LOCALES;
export type TranslationKey = keyof typeof en;

/**
 * Translate a key for the given locale. Falls back to the key itself when the
 * translation is missing so the UI never breaks on a typo.
 */
export function translate(locale: Locale, key: TranslationKey): string {
  return LOCALES[locale][key] ?? key;
}
