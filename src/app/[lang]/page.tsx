import HeroSection from "@/components/HeroSection/HeroSection";
import styles from "./page.module.css";
import { Lang } from "@/lib/types";
import { getDictionary } from "@/lib/utils";
import StatBar from "@/components/StatBar/StatBar";
import IntroSection from "@/components/IntroSection/IntroSection";
import SpecializationsSection from "@/components/SpecializationsSection/SpecializationsSection";

interface HomeProps {
  params: Promise<{ lang: Lang }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;

  const content = getDictionary(lang);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection content={content.hero} />
        <StatBar content={content.statBar} />
        <IntroSection content={content.Intro} />
        <SpecializationsSection content={content.specializations} />
      </main>
    </div>
  );
}
