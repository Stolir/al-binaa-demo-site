import type { Metadata } from "next";
import { fontsByLang } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Al-Binaa Engineering",
  description: "This is not a real business. SEO metadata goes here",
};

type Lang = "en" | "ar";

interface layoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function RootLayout({ children, params }: layoutProps) {
  const { lang } = await params;

  const locale: Lang = lang === "ar" ? "ar" : "en";

  return (
    <html
      lang={"en"}
      dir={lang === "en" ? "ltr" : "rtl"}
      className={`${fontsByLang[locale].display.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
