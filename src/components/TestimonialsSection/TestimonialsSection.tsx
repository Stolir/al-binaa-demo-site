import styles from "./TestimonialsSection.module.css";

export type TestimonialItem = {
  quote: string;
  name: string;
  company: string;
};

export type TestimonialsContent = {
  header: string;
  items: TestimonialItem[];
};

interface TestimonialsSectionProps {
  content: TestimonialsContent;
}

function TestimonialsSection({ content }: TestimonialsSectionProps) {
  return (
    <section className={styles.testimonialsSection} aria-label={content.header}>
      <div className={styles.container}>
        <header className={styles.headerWrapper}>
          <h2 className={styles.header}>{content.header}</h2>
          <div className={styles.accentLine} aria-hidden="true" />
        </header>

        <div className={styles.grid}>
          {content.items.map((item, index) => (
            <article key={index} className={styles.card}>
              <blockquote className={styles.quote}>
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className={styles.authorWrapper}>
                <div
                  className={styles.avatarPlaceholder}
                  aria-label={`${item.company} logo`}
                >
                  <svg
                    className={styles.avatarIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="16" height="20" x="4" y="2" rx="1" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01" />
                    <path d="M16 6h.01" />
                    <path d="M12 6h.01" />
                    <path d="M12 10h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 10h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 10h.01" />
                    <path d="M8 14h.01" />
                  </svg>
                </div>

                <div className={styles.authorDetails}>
                  <p className={styles.authorName}>{item.name}</p>
                  <p className={styles.authorCompany}>{item.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
