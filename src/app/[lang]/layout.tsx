import type { Metadata } from "next";
import { fontsByLang } from "@/lib/fonts";

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import ScrollRestorer from "@/components/ScrollRestorer/ScrollRestorer";
import { getDictionary } from "@/lib/utils";
import { Lang } from "@/lib/types";

export const metadata: Metadata = {
  title: "Al-Binaa Engineering",
  description: "This is not a real business. SEO metadata goes here",
};

interface layoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Lang }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function RootLayout({ children, params }: layoutProps) {
  const { lang } = await params;

  const content = getDictionary(lang);

  return (
    <html
      lang={content.meta.lang}
      dir={content.meta.dir}
      className={`${fontsByLang[lang].display.variable} ${fontsByLang[lang].body.variable} ${fontsByLang[lang].label.variable}`}
    >
      <body>
        <ScrollRestorer />
        <Navbar content={content.navbar} lang={lang} />
        {children}
      </body>
    </html>
  );
}
