import styles from "./AccreditationStrip.module.css";

export type AccreditationItem = {
  code: string;
  name: string;
  issuer: string;
};

export type AccreditationsContent = {
  eyebrow: string;
  title: string;
  items: AccreditationItem[];
};

interface AccreditationStripProps {
  content: AccreditationsContent;
}

function AccreditationCard({ item }: { item: AccreditationItem }) {
  return (
    <article className={styles.card}>
      <div className={styles.badgeHeader}>
        <span className={styles.badgeCode}>{item.code}</span>
        <div className={styles.statusIndicator} aria-hidden="true" />
      </div>
      <h3 className={styles.badgeName}>{item.name}</h3>
      <p className={styles.badgeIssuer}>{item.issuer}</p>
    </article>
  );
}

function AccreditationStrip({ content }: AccreditationStripProps) {
  return (
    <section className={styles.sectionWrapper} aria-label={content.title}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title}>{content.title}</h2>
        </div>

        <div className={styles.accreditationGrid}>
          {content.items.map((item) => (
            <AccreditationCard key={item.code} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AccreditationStrip;
