"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

interface LanguageSwitcherProps {
  href: string;
  text: string;
}

const SCROLL_POS_KEY = "al_binaa_lang_scroll_ratio";

function getTargetUrl(pathname: string | null, defaultHref: string): string {
  if (!pathname) return defaultHref;

  const targetLocale = defaultHref.split("/").filter(Boolean)[0];
  if (!targetLocale) return defaultHref;

  const segments = pathname.split("/");
  if (segments.length > 1 && (segments[1] === "en" || segments[1] === "ar")) {
    segments[1] = targetLocale;
    return segments.join("/") || "/";
  }

  return defaultHref;
}

export default function LanguageSwitcher({
  href,
  text,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const targetHref = getTargetUrl(pathname, href);

  const handleLanguageSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();

    // Calculate normalized scroll ratio (0 = top, 1 = bottom)
    const docElement = document.documentElement;
    const scrollHeight = docElement.scrollHeight - window.innerHeight;
    const scrollRatio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    // Save scroll progress so the target locale page restores it
    sessionStorage.setItem(SCROLL_POS_KEY, scrollRatio.toString());

    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const destination = `${targetHref}${search}${hash}`;

    startTransition(() => {
      router.push(destination);
    });
  };

  return (
    <a href={targetHref} onClick={handleLanguageSwitch} aria-busy={isPending}>
      {text}
    </a>
  );
}
