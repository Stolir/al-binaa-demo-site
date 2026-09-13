import styles from "./PageHeader.module.css";

export type PageHeaderContent = {
  eyebrow: string;
  title: string;
  description: string;
};

interface PageHeaderProps {
  content: PageHeaderContent;
}

function PageHeader({ content }: PageHeaderProps) {
  return (
    <header className={styles.headerSection} aria-label={content.title}>
      <div className={styles.container}>
        {content.eyebrow && <p className={styles.eyebrow}>{content.eyebrow}</p>}
        <h1 className={styles.title}>{content.title}</h1>
        {content.description && (
          <p className={styles.description}>{content.description}</p>
        )}
      </div>
    </header>
  );
}

export default PageHeader;
