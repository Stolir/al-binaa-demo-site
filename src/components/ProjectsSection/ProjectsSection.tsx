import Link from "next/link";
import styles from "./ProjectsSection.module.css";

export type ProjectItem = {
  location: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
};

export type ProjectsContent = {
  header: string;
  subheader: string;
  viewAll: string;
  items: ProjectItem[];
};

interface ProjectsSectionProps {
  content: ProjectsContent;
}

function ProjectsSection({ content }: ProjectsSectionProps) {
  // Sort projects by year descending and pick the 2 most recent
  const recentProjects = [...content.items]
    .sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10))
    .slice(0, 2);

  return (
    <section className={styles.projectsSection}>
      <header className={styles.sectionHeader}>
        <div className={styles.headerTitles}>
          <p className={styles.subheader}>{content.subheader}</p>
          <h2 className={styles.header}>{content.header}</h2>
        </div>
        <Link href="/projects" className={styles.viewAllLink}>
          {content.viewAll}
        </Link>
      </header>

      <div className={styles.projectsList}>
        {recentProjects.map((project, index) => {
          const isReversed = index % 2 === 1;

          return (
            <article
              key={`${project.title}-${project.year}`}
              className={`${styles.projectCard} ${isReversed ? styles.reversed : ""}`}
            >
              {/* Image container placeholder */}
              <div
                className={styles.imageContainer}
                aria-label={`Image placeholder for ${project.title}`}
              >
                <div className={styles.imagePlaceholder}>
                  <span className={styles.placeholderLabel}>
                    {project.title}
                  </span>
                </div>
              </div>

              {/* Text details container */}
              <div className={styles.textContainer}>
                <div className={styles.metaInfo}>
                  <span className={styles.location}>{project.location}</span>
                  <span className={styles.year}>{project.year}</span>
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>

                <div className={styles.tagsContainer}>
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectsSection;
