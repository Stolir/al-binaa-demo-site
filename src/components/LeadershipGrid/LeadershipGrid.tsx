import styles from "./LeadershipGrid.module.css";

export type PrincipalItem = {
  name: string;
  role: string;
  credentials: string;
  experience: string;
  bio: string;
};

export type LeadershipContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: PrincipalItem[];
};

interface LeadershipGridProps {
  content: LeadershipContent;
}

function PrincipalCard({ item }: { item: PrincipalItem }) {
  return (
    <article className={styles.card}>
      <div className={styles.portraitWrapper} aria-hidden="true">
        <div className={styles.placeholderPortrait}>
          {/* Industrial engineering glyph / monogram placeholder */}
          <svg
            className={styles.blueprintIcon}
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="24" cy="18" r="8" />
            <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" />
            <line x1="6" y1="44" x2="42" y2="44" />
          </svg>
        </div>
        <div className={styles.experienceBadge}>
          <span>{item.experience}</span>
        </div>
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.headerBlock}>
          <p className={styles.role}>{item.role}</p>
          <h3 className={styles.name}>{item.name}</h3>
          <p className={styles.credentials}>{item.credentials}</p>
        </div>
        <p className={styles.bio}>{item.bio}</p>
      </div>
    </article>
  );
}

function LeadershipGrid({ content }: LeadershipGridProps) {
  return (
    <section className={styles.sectionWrapper} aria-label={content.title}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title}>{content.title}</h2>
          {content.description && (
            <p className={styles.headerDesc}>{content.description}</p>
          )}
        </div>

        <div className={styles.principalsGrid}>
          {content.items.map((item) => (
            <PrincipalCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeadershipGrid;
