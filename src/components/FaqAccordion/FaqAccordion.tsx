"use client";

import { useState, useId } from "react";
import styles from "./FaqAccordion.module.css";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

interface FaqAccordionProps {
  content: FaqContent;
}

function FaqItemComponent({ item, index }: { item: FaqItem; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const rawId = useId();
  const buttonId = `faq-btn-${rawId}`;
  const panelId = `faq-panel-${rawId}`;

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen(!isOpen)}
          className={styles.questionButton}
        >
          <span className={styles.questionText}>{item.question}</span>
          <span className={styles.iconWrapper} aria-hidden="true">
            <svg
              className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={styles.panel}
      >
        <p className={styles.answerText}>{item.answer}</p>
      </div>
    </div>
  );
}

function FaqAccordion({ content }: FaqAccordionProps) {
  return (
    <section className={styles.sectionWrapper} aria-label={content.title}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title}>{content.title}</h2>
        </div>

        <div className={styles.accordionList}>
          {content.items.map((item, idx) => (
            <FaqItemComponent key={item.question} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqAccordion;
