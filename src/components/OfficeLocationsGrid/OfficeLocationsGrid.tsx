import styles from "./OfficeLocationsGrid.module.css";

export type OfficeItem = {
  city: string;
  role: string;
  address: string;
  country: string;
  phone: string;
  email: string;
};

export type OfficesContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: OfficeItem[];
};

interface OfficeLocationsGridProps {
  content: OfficesContent;
}

function OfficeCard({ item }: { item: OfficeItem }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.roleBadge}>{item.role}</span>
        <h3 className={styles.city}>{item.city}</h3>
      </div>

      <div className={styles.addressBlock}>
        <p className={styles.address}>{item.address}</p>
        <p className={styles.country}>{item.country}</p>
      </div>

      <div className={styles.contactDetails}>
        <a href={`tel:${item.phone.replace(/\s+/g, "")}`} className={styles.link}>
          <span className={styles.linkLabel}>T:</span>
          <span dir="ltr">{item.phone}</span>
        </a>
        <a href={`mailto:${item.email}`} className={styles.link}>
          <span className={styles.linkLabel}>E:</span>
          <span>{item.email}</span>
        </a>
      </div>
    </article>
  );
}

function OfficeLocationsGrid({ content }: OfficeLocationsGridProps) {
  return (
    <section className={styles.sectionWrapper} aria-label={content.title}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title}>{content.title}</h2>
          {content.description && (
            <p className={styles.description}>{content.description}</p>
          )}
        </div>

        <div className={styles.officesGrid}>
          {content.items.map((item) => (
            <OfficeCard key={item.city} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OfficeLocationsGrid;
