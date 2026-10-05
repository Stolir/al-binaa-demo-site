import styles from "./MilestonesTimeline.module.css";

export type MilestoneItem = {
  year: string;
  title: string;
  description: string;
};

export type MilestonesContent = {
  eyebrow: string;
  title: string;
  items: MilestoneItem[];
};

interface MilestonesTimelineProps {
  content: MilestonesContent;
}

function MilestoneCard({ item }: { item: MilestoneItem }) {
  return (
    <article className={styles.timelineItem}>
      <div className={styles.markerContainer}>
        <div className={styles.yearNode}>
          <span className={styles.yearText}>{item.year}</span>
        </div>
        <div className={styles.stemLine} aria-hidden="true" />
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardDesc}>{item.description}</p>
      </div>
    </article>
  );
}

function MilestonesTimeline({ content }: MilestonesTimelineProps) {
  return (
    <section className={styles.sectionWrapper} aria-label={content.title}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title}>{content.title}</h2>
        </div>

        <div className={styles.timelineGrid}>
          {content.items.map((item) => (
            <MilestoneCard key={item.year} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MilestonesTimeline;
