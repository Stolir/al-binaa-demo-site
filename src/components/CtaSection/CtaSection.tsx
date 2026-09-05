import Link from "next/link";
import styles from "./CtaSection.module.css";

export type CtaButton = {
  label: string;
  href: string;
};

export type CtaContent = {
  heading: string;
  subtext: string;
  primary: CtaButton;
  secondary: CtaButton;
};

interface CtaSectionProps {
  content: CtaContent;
}

function CtaSection({ content }: CtaSectionProps) {
  return (
    <section className={styles.ctaSection} aria-labelledby="cta-heading">
      <div className={styles.container}>
        <h2 id="cta-heading" className={styles.heading}>
          {content.heading}
        </h2>

        <p className={styles.subtext}>{content.subtext}</p>

        <div className={styles.buttonGroup}>
          <Link
            href={content.primary.href || "#"}
            className={styles.primaryBtn}
            role="button"
          >
            <svg
              className={styles.buttonIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{content.primary.label}</span>
          </Link>

          <Link
            href={content.secondary.href || "#"}
            className={styles.secondaryBtn}
            role="button"
          >
            <span>{content.secondary.label}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
