import type { Locale, ITranslations } from './types';
import { cs } from './locales/cs';
import { en } from './locales/en';

const translations: Record<Locale, ITranslations> = {
    cs,
    en,
};

export const defaultLocale: Locale = 'cs';
export const locales: Locale[] = ['cs', 'en'];

const sectionIdsByLocale: Record<Locale, {
    projects: string;
    services: string;
    clients: string;
    contact: string;
}> = {
    cs: {
        projects: 'projekty',
        services: 'sluzby',
        clients: 'klienti',
        contact: 'kontakt',
    },
    en: {
        projects: 'projects',
        services: 'services',
        clients: 'clients',
        contact: 'contact',
    },
};

export function getSectionIds(locale: Locale): typeof sectionIdsByLocale[Locale] {
    return sectionIdsByLocale[locale] || sectionIdsByLocale[defaultLocale];
}

/**
 * Get translations for a specific locale
 */
export function getTranslations(locale: Locale = defaultLocale): ITranslations {
    return translations[locale] || translations[defaultLocale];
}

/**
 * Extract locale from URL path
 * @param url - The current URL object
 * @returns The detected locale or default locale
 */
export function getLocaleFromUrl(url: URL): Locale {
    const pathname = url.pathname;
    const segments = pathname.split('/').filter(Boolean);

    // Check if first segment is a valid locale
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
        return segments[0] as Locale;
    }

    return defaultLocale;
}

/**
 * Get localized path for a given path and locale
 * @param path - The path to localize (e.g., "/projects" or "/#projects")
 * @param locale - The target locale
 * @returns The localized path
 */
export function getLocalizedPath(path: string, locale: Locale): string {
    // Remove leading slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // If default locale, don't prefix
    if (locale === defaultLocale) {
        return `/${cleanPath}`;
    }

    // For other locales, add locale prefix
    return `/${locale}/${cleanPath}`;
}

/**
 * Format years with proper Czech declension
 * @param years - Number of years
 * @param locale - The locale to use for formatting
 * @returns Formatted string like "5+ let" (cs) or "5+ years" (en)
 */
export function formatYears(years: number, locale: Locale = defaultLocale): string {
    if (locale === 'cs') {
        if (years === 1) {
            return `${years}+ rok`;
        } else if (years >= 2 && years <= 4) {
            return `${years}+ roky`;
        } else {
            return `${years}+ let`;
        }
    }

    // English
    if (years === 1) {
        return `${years}+ year`;
    }
    return `${years}+ years`;
}

/**
 * Get alternate language URL for language switcher
 * @param currentUrl - Current URL object
 * @param targetLocale - Target locale to switch to
 * @returns The alternate URL
 */
export function getAlternateUrl(currentUrl: URL, targetLocale: Locale): string {
    const currentLocale = getLocaleFromUrl(currentUrl);
    let pathname = currentUrl.pathname;

    // Remove current locale prefix if present
    if (currentLocale !== defaultLocale) {
        pathname = pathname.replace(`/${currentLocale}`, '');
    }

    // Add target locale prefix if not default
    if (targetLocale !== defaultLocale) {
        pathname = `/${targetLocale}${pathname}`;
    }

    // Ensure pathname starts with /
    if (!pathname.startsWith('/')) {
        pathname = `/${pathname}`;
    }

    return pathname + currentUrl.hash;
}

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}
