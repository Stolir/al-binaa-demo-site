import styles from "./PortfolioStats.module.css";

export type PortfolioStatItem = {
  value: string;
  unit: string;
  label: string;
};

export type PortfolioStatsContent = {
  eyebrow: string;
  title: string;
  items: PortfolioStatItem[];
};

interface PortfolioStatsProps {
  content: PortfolioStatsContent;
}

function PortfolioStats({ content }: PortfolioStatsProps) {
  return (
    <section
      className={styles.sectionWrapper}
      aria-labelledby="portfolio-stats-heading"
    >
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="portfolio-stats-heading" className={styles.title}>
            {content.title}
          </h2>
        </div>

        <dl className={styles.statsGrid}>
          {content.items.map((item) => (
            <div key={item.label} className={styles.statItem}>
              <dt className={styles.statLabel}>{item.label}</dt>
              <dd className={styles.statValue}>
                {item.value}
                <span className={styles.statUnit}>{item.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default PortfolioStats;
