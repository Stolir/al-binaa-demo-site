import en from "./content/en.json";
import ar from "./content/ar.json";
import { Lang } from "./types";

const dictionaries = { en, ar } as const;

export function getDictionary(lang: Lang) {
  return dictionaries[lang];
}

export function localizeHref(
  href: string | undefined | null,
  lang: Lang,
  fallbackPath = ""
): string {
  if (!href || href === "#") {
    if (fallbackPath) {
      return fallbackPath.startsWith("/")
        ? `/${lang}${fallbackPath}`
        : `/${lang}/${fallbackPath}`;
    }
    return `/${lang}`;
  }

  // External or scheme-based links (http, https, mailto, tel)
  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    return href;
  }

  // Already localized with language segment
  if (
    href === "/en" ||
    href.startsWith("/en/") ||
    href === "/ar" ||
    href.startsWith("/ar/")
  ) {
    return href;
  }

  // Hash anchor on current page
  if (href.startsWith("#")) {
    return `/${lang}${href}`;
  }

  // Path with leading slash
  if (href.startsWith("/")) {
    return `/${lang}${href}`;
  }

  return `/${lang}/${href}`;
}
