import styles from "./AboutValues.module.css";

export type ValueItem = {
  numeral: string;
  title: string;
  description: string;
};

export type AboutValuesContent = {
  eyebrow: string;
  title: string;
  items: ValueItem[];
};

interface AboutValuesProps {
  content: AboutValuesContent;
}

function ValueCard({ item }: { item: ValueItem }) {
  return (
    <article className={styles.card}>
      <div className={styles.numeralRow}>
        <span className={styles.numeral}>{item.numeral}</span>
        <div className={styles.accentRule} aria-hidden="true" />
      </div>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.description}</p>
    </article>
  );
}

function AboutValues({ content }: AboutValuesProps) {
  return (
    <section className={styles.sectionWrapper} aria-label={content.title}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title}>{content.title}</h2>
        </div>

        <div className={styles.valuesGrid}>
          {content.items.map((item) => (
            <ValueCard key={item.numeral} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutValues;
