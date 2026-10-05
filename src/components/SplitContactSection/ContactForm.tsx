"use client";

import { useState, useId } from "react";
import styles from "./ContactForm.module.css";

export type ContactFormContent = {
  formTitle: string;
  formSubtitle: string;
  fields: {
    fullName: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    sector: {
      label: string;
      placeholder: string;
      options: { value: string; label: string }[];
    };
    scope: { label: string; placeholder: string };
  };
  submitButton: string;
  submittingText: string;
  successMessage: string;
};

interface ContactFormProps {
  content: ContactFormContent;
}

export default function ContactForm({ content }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameId = useId();
  const companyId = useId();
  const emailId = useId();
  const phoneId = useId();
  const sectorId = useId();
  const scopeId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>{content.formTitle}</h2>
        <p className={styles.formSubtitle}>{content.formSubtitle}</p>
      </div>

      {isSubmitted ? (
        <div className={styles.successAlert} role="status" aria-live="polite">
          <svg
            className={styles.successIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p className={styles.successText}>{content.successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form} noValidate={false}>
          <div className={styles.fieldsGrid}>
            <div className={styles.fieldGroup}>
              <label htmlFor={nameId} className={styles.label}>
                {content.fields.fullName.label} <span className={styles.required}>*</span>
              </label>
              <input
                id={nameId}
                name="fullName"
                type="text"
                required
                aria-required="true"
                placeholder={content.fields.fullName.placeholder}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor={companyId} className={styles.label}>
                {content.fields.company.label} <span className={styles.required}>*</span>
              </label>
              <input
                id={companyId}
                name="company"
                type="text"
                required
                aria-required="true"
                placeholder={content.fields.company.placeholder}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor={emailId} className={styles.label}>
                {content.fields.email.label} <span className={styles.required}>*</span>
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                required
                aria-required="true"
                placeholder={content.fields.email.placeholder}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor={phoneId} className={styles.label}>
                {content.fields.phone.label}
              </label>
              <input
                id={phoneId}
                name="phone"
                type="tel"
                placeholder={content.fields.phone.placeholder}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor={sectorId} className={styles.label}>
              {content.fields.sector.label} <span className={styles.required}>*</span>
            </label>
            <select
              id={sectorId}
              name="sector"
              required
              aria-required="true"
              defaultValue=""
              className={styles.select}
            >
              <option value="" disabled>
                {content.fields.sector.placeholder}
              </option>
              {content.fields.sector.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor={scopeId} className={styles.label}>
              {content.fields.scope.label} <span className={styles.required}>*</span>
            </label>
            <textarea
              id={scopeId}
              name="scope"
              rows={4}
              required
              aria-required="true"
              placeholder={content.fields.scope.placeholder}
              className={styles.textarea}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? content.submittingText : content.submitButton}
          </button>
        </form>
      )}
    </div>
  );
}
