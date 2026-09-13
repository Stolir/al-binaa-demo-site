import styles from "./DisciplinesDetail.module.css";

export type DisciplineItem = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  metric: {
    value: string;
    label: string;
  };
};

export type DisciplinesContent = {
  eyebrow: string;
  title: string;
  deliverablesTitle?: string;
  items: DisciplineItem[];
};

interface DisciplinesDetailProps {
  content: DisciplinesContent;
}

interface DisciplineCardProps {
  item: DisciplineItem;
  deliverablesTitle?: string;
}

function DisciplineCard({ item, deliverablesTitle }: DisciplineCardProps) {
  return (
    <article className={styles.disciplineCard}>
      <div className={styles.mainInfo}>
        <div>
          <div className={styles.topHeader}>
            <span className={styles.codeBadge}>{item.code}</span>
          </div>
          <h3 className={styles.disciplineTitle}>{item.title}</h3>
          <p className={styles.subtitle}>{item.subtitle}</p>
          <p className={styles.description}>{item.description}</p>
        </div>

        <div className={styles.metricBadge}>
          <span className={styles.metricValue}>{item.metric.value}</span>
          <span className={styles.metricLabel}>{item.metric.label}</span>
        </div>
      </div>

      <div className={styles.capabilitiesSide}>
        {deliverablesTitle && (
          <h4 className={styles.capabilitiesHeading}>{deliverablesTitle}</h4>
        )}
        <ul className={styles.capabilitiesList}>
          {item.capabilities.map((cap, idx) => (
            <li key={idx} className={styles.capabilityItem}>
              <svg
                className={styles.checkIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function DisciplinesDetail({ content }: DisciplinesDetailProps) {
  return (
    <section className={styles.sectionWrapper} aria-label={content.title}>
      <div className={styles.container}>
        <header className={styles.headerWrapper}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title}>{content.title}</h2>
        </header>

        <div className={styles.disciplinesList}>
          {content.items.map((item) => (
            <DisciplineCard
              key={item.id}
              item={item}
              deliverablesTitle={content.deliverablesTitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DisciplinesDetail;
