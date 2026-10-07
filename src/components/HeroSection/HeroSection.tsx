import Image from "next/image";
import styles from "./HeroSection.module.css";
import heroImage from "../../../public/tye-doring-a7xke_rxZRs-unsplash.jpg";
import ButtonLink from "../ButtonLink/ButtonLink";
import { Lang } from "@/lib/types";
import { localizeHref } from "@/lib/utils";

interface headlinePart {
  text: string;
  accent: boolean;
}

type Content = {
  headlineParts: Array<headlinePart>;
  subtext: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
};

interface HeroSectionProps {
  content: Content;
  lang?: Lang;
}

function HeroSection({ content, lang = "en" }: HeroSectionProps) {
  return (
    <section className={styles.heroSection}>
      <Image src={heroImage} alt="" sizes="100vw" priority />
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h1>
            {content.headlineParts.map((part, i) => (
              <span key={i} className={`${part.accent ? styles.accent : ""}`}>
                {part.text + " "}
              </span>
            ))}
          </h1>
          <p>{content.subtext}</p>
        </div>
        <div className={styles.ctaContainer}>
          <ButtonLink
            href={localizeHref(content.ctaPrimary.href, lang, "/contact")}
            variant="primary"
          >
            {content.ctaPrimary.label}
          </ButtonLink>
          <ButtonLink
            href={localizeHref(content.ctaSecondary.href, lang, "/projects")}
            variant="secondary"
          >
            {content.ctaSecondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
