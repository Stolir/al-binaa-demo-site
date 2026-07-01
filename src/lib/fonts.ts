import {
  Sora,
  Inter,
  IBM_Plex_Sans,
  Almarai,
  Tajawal,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

import { NextFontWithVariable } from "next/dist/compiled/@next/font";

export const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

export const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

export const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
});

export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

interface FontSet {
  display: NextFontWithVariable;
  body: NextFontWithVariable;
  label: NextFontWithVariable;
}

interface FontsByLang {
  en: FontSet;
  ar: FontSet;
}

export const fontsByLang: FontsByLang = {
  en: {
    display: sora,
    body: inter,
    label: ibmPlexSans,
  },
  ar: {
    display: almarai,
    body: tajawal,
    label: ibmPlexSansArabic,
  },
};
