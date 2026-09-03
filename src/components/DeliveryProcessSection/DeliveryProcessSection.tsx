import styles from "./DeliveryProcessSection.module.css";

export type DeliveryStep = {
  step: string;
  title: string;
  description: string;
};

export type DeliveryProcessContent = {
  header: string;
  subheader: string;
  steps: DeliveryStep[];
};

interface DeliveryProcessSectionProps {
  content: DeliveryProcessContent;
}

function DeliveryProcessSection({ content }: DeliveryProcessSectionProps) {
  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{content.header}</h2>
          <p className={styles.subtitle}>{content.subheader}</p>
        </header>

        <div className={styles.stepsWrapper}>
          {/* Connector timeline line (visible on desktop) */}
          <div className={styles.connectingLine} aria-hidden="true" />

          <div className={styles.stepsGrid}>
            {content.steps.map((item) => (
              <article key={item.step} className={styles.stepCard}>
                <div className={styles.badge}>{item.step}</div>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDescription}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeliveryProcessSection;
