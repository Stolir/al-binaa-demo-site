import styles from "./SafetySection.module.css";

export type SafetyMetric = {
  value: string;
  label: string;
};

export type SafetyHighlight = {
  value: string;
  label: string;
};

export type SafetyContent = {
  title: string;
  description: string;
  highlight: SafetyHighlight;
  metrics: SafetyMetric[];
};

interface SafetySectionProps {
  content: SafetyContent;
}

function SafetySection({ content }: SafetySectionProps) {
  return (
    <section className={styles.safetySection} aria-label={content.title}>
      <div className={styles.container}>
        {/* Left Column: Dark Highlight Card */}
        <article className={styles.highlightCard}>
          <div className={styles.iconWrapper}>
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>

          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.description}>{content.description}</p>
          <div className={styles.highlightStat}>{content.highlight.value}</div>
        </article>

        {/* Right Column: 2x2 Metrics Grid */}
        <div className={styles.metricsGrid}>
          {content.metrics.map((metric) => (
            <article key={metric.label} className={styles.metricCard}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SafetySection;
