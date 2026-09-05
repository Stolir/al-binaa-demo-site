"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface LanguageSwitcherProps {
  href: string;
  text: string;
}

const SCROLL_POS_KEY = "al_binaa_lang_scroll_ratio";

export default function LanguageSwitcher({
  href,
  text,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLanguageSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Calculate normalized scroll ratio (0 = top, 1 = bottom)
    const docElement = document.documentElement;
    const scrollHeight = docElement.scrollHeight - window.innerHeight;
    const scrollRatio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    // Save scroll progress so the target locale page restores it
    sessionStorage.setItem(SCROLL_POS_KEY, scrollRatio.toString());

    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <a href={href} onClick={handleLanguageSwitch} aria-busy={isPending}>
      {text}
    </a>
  );
}
