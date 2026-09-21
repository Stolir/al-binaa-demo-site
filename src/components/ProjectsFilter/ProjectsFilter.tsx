"use client";
import { useState } from "react";
import styles from "./ProjectsFilter.module.css";
import Image from "next/image";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectGalleryItem = {
  id: string;
  category: string;
  location: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  metrics: ProjectMetric[];
  image: string;
};

export type FilterCategory = {
  id: string;
  label: string;
};

export type ProjectsFilterContent = {
  filter: {
    allLabel: string;
    countSuffix: string;
    categories: FilterCategory[];
  };
  items: ProjectGalleryItem[];
};

interface ProjectsFilterProps {
  content: ProjectsFilterContent;
}

interface ProjectCardProps {
  item: ProjectGalleryItem;
}

function ProjectCard({ item }: ProjectCardProps) {
  return (
    <article className={styles.projectCard}>
      <div className={styles.imageContainer}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.projectImage}
        />
        <div className={styles.imageOverlay}>
          <span className={styles.categoryChip}>{item.category}</span>
        </div>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.meta}>
          {item.location}
          <span className={styles.metaDivider} aria-hidden="true">|</span>
          {item.year}
        </p>

        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardDescription}>{item.description}</p>

        <div className={styles.metrics}>
          {item.metrics.map((m) => (
            <div key={m.label} className={styles.metricChip}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>

        <ul className={styles.tagList} aria-label="Project tags">
          {item.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ProjectsFilter({ content }: ProjectsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? content.items
      : content.items.filter((item) => item.category === activeCategory);

  return (
    <section className={styles.sectionWrapper}>
      {/* Sticky filter bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterContainer}>
          <div
            role="tablist"
            aria-label="Filter projects by sector"
            className={styles.tabList}
          >
            {content.filter.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <p className={styles.countBadge} aria-live="polite" aria-atomic="true">
            <span className={styles.countNumber}>{filtered.length}</span>
            {" "}{content.filter.countSuffix}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.container}>
        <div
          role="tabpanel"
          aria-label={`Filtered projects: ${activeCategory}`}
          className={styles.grid}
        >
          {filtered.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsFilter;
