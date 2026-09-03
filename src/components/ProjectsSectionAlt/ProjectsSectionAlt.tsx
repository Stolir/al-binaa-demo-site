import Link from "next/link";
import styles from "./ProjectsSectionAlt.module.css";

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

interface ProjectsSectionAltProps {
  content: ProjectsContent;
}

function ProjectsSectionAlt({ content }: ProjectsSectionAltProps) {
  // Sort projects descending by year to pick the 2 most recent
  const recentProjects = [...content.items]
    .sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10))
    .slice(0, 2);

  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.sectionHeader}>
          <div className={styles.headerTitles}>
            <h2 className={styles.header}>{content.header}</h2>
            <p className={styles.subheader}>{content.subheader}</p>
          </div>
          <Link href="/projects" className={styles.viewAllLink}>
            {content.viewAll}
          </Link>
        </header>

        {/* Projects List */}
        <div className={styles.projectsList}>
          {recentProjects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={`${project.title}-${project.year}`}
                className={`${styles.projectCard} ${isReversed ? styles.reversed : ""}`}
              >
                {/* Empty Image Container Placeholder awaiting assets */}
                <div
                  className={styles.imageContainer}
                  aria-label={`Image placeholder for ${project.title}`}
                >
                  <div className={styles.imagePlaceholder} />
                </div>

                {/* Project Details */}
                <div className={styles.textContainer}>
                  <p className={styles.metaInfo}>
                    <span className={styles.location}>{project.location}</span>
                    <span className={styles.divider}>|</span>
                    <span className={styles.year}>{project.year}</span>
                  </p>

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
      </div>
    </section>
  );
}

export default ProjectsSectionAlt;
