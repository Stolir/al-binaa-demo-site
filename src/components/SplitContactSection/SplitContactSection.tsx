import styles from "./SplitContactSection.module.css";
import ContactForm, { ContactFormContent } from "./ContactForm";

export type DirectChannelItem = {
  label: string;
  value: string;
  type: string;
};

export type DirectChannelsContent = {
  title: string;
  description: string;
  items: DirectChannelItem[];
};

export type SplitContactContent = {
  formTitle: string;
  formSubtitle: string;
  fields: ContactFormContent["fields"];
  submitButton: string;
  submittingText: string;
  successMessage: string;
  directChannels: DirectChannelsContent;
};

interface SplitContactSectionProps {
  content: SplitContactContent;
}

function DirectChannelsCard({ content }: { content: DirectChannelsContent }) {
  return (
    <aside className={styles.channelsCard} aria-label={content.title}>
      <div className={styles.channelsHeader}>
        <div className={styles.indicatorBadge} aria-hidden="true" />
        <h3 className={styles.channelsTitle}>{content.title}</h3>
        <p className={styles.channelsDesc}>{content.description}</p>
      </div>

      <div className={styles.channelList}>
        {content.items.map((item) => (
          <div key={item.label} className={styles.channelItem}>
            <span className={styles.channelLabel}>{item.label}</span>
            {item.type === "email" ? (
              <a href={`mailto:${item.value}`} className={styles.channelLink}>
                {item.value}
              </a>
            ) : item.type === "phone" ? (
              <a href={`tel:${item.value.replace(/\s+/g, "")}`} className={styles.channelLink}>
                <span dir="ltr">{item.value}</span>
              </a>
            ) : (
              <span className={styles.channelValue}>{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

function SplitContactSection({ content }: SplitContactSectionProps) {
  const formContent: ContactFormContent = {
    formTitle: content.formTitle,
    formSubtitle: content.formSubtitle,
    fields: content.fields,
    submitButton: content.submitButton,
    submittingText: content.submittingText,
    successMessage: content.successMessage,
  };

  return (
    <section className={styles.sectionWrapper} aria-label="Contact Section">
      <div className={styles.container}>
        <div className={styles.splitGrid}>
          <div className={styles.leftCol}>
            <ContactForm content={formContent} />
          </div>
          <div className={styles.rightCol}>
            <DirectChannelsCard content={content.directChannels} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitContactSection;
