import Image from "next/image";
import styles from "./HeroSection.module.css";
import heroImage from "../../../public/tye-doring-a7xke_rxZRs-unsplash.jpg";
import CTAButton from "../ButtonLink/ButtonLink";
import ButtonLink from "../ButtonLink/ButtonLink";

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

function HeroSection({ content }: { content: Content }) {
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
          <ButtonLink href={content.ctaPrimary.href} variant="primary">
            {content.ctaPrimary.label}
          </ButtonLink>
          <ButtonLink href={content.ctaSecondary.href} variant="secondary">
            {content.ctaSecondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
