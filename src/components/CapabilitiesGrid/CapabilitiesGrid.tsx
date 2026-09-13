import styles from "./CapabilitiesGrid.module.css";

export type CapabilityItem = {
  code: string;
  title: string;
  description: string;
};

export type CapabilitiesContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: CapabilityItem[];
};

interface CapabilitiesGridProps {
  content: CapabilitiesContent;
}

function CapabilitiesGrid({ content }: CapabilitiesGridProps) {
  return (
    <section className={styles.sectionWrapper} aria-label={content.title}>
      <div className={styles.container}>
        <header className={styles.headerWrapper}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.description}>{content.description}</p>
        </header>

        <div className={styles.grid}>
          {content.items.map((item) => (
            <article key={item.code} className={styles.card}>
              <div className={styles.topBar}>
                <span className={styles.codeBadge}>{item.code}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CapabilitiesGrid;
