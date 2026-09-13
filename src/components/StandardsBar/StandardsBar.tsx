import styles from "./StandardsBar.module.css";

export type StandardBadge = {
  code: string;
  name: string;
};

export type StandardsContent = {
  eyebrow: string;
  title: string;
  badges: StandardBadge[];
};

interface StandardsBarProps {
  content: StandardsContent;
}

function StandardsBar({ content }: StandardsBarProps) {
  return (
    <section className={styles.sectionWrapper} aria-label={content.title}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title}>{content.title}</h2>
        </div>

        <div className={styles.badgesGrid}>
          {content.badges.map((badge) => (
            <div key={badge.code} className={styles.badgeCard}>
              <span className={styles.badgeCode}>{badge.code}</span>
              <span className={styles.badgeName}>{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StandardsBar;
