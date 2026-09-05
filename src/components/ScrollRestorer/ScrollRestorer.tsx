"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const SCROLL_POS_KEY = "al_binaa_lang_scroll_ratio";

export default function ScrollRestorer() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const savedRatio = sessionStorage.getItem(SCROLL_POS_KEY);
    if (savedRatio !== null) {
      sessionStorage.removeItem(SCROLL_POS_KEY);
      const ratio = parseFloat(savedRatio);

      if (!isNaN(ratio) && ratio > 0) {
        // Double RAF ensures Next.js has completed rendering the DOM and layout shifts
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const docElement = document.documentElement;
            const scrollHeight = docElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
              window.scrollTo({
                top: ratio * scrollHeight,
                behavior: "instant" as ScrollBehavior,
              });
            }
          });
        });
      }
    }
  }, [pathname]);

  return null;
}
