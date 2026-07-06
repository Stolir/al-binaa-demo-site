import Image, { StaticImageData } from "next/image";
import styles from "./IntroSection.module.css";
import ISOBadge from "../../../public/icons/iso-badge.png";
import AIABadge from "../../../public/icons/AIA-badge.png";
import healthBadge from "../../../public/icons/health-shield-badge.png";
import leedBadge from "../../../public/icons/leed-gold-badge.png";

type Content = {
  header: string;
  subtext: string;
};

interface badgeCardProps {
  src: StaticImageData;
  alt: string;
  size?: number;
  text: string;
}

const badges = [
  {
    src: ISOBadge,
    alt: "ISO badge",
    text: "ISO 9001:2015",
  },
  {
    src: leedBadge,
    alt: "LEED gold badge",
    text: "LEED GOLD",
  },
  {
    src: healthBadge,
    alt: "OHSAS badge",
    text: "OHSAS 18001",
  },
  {
    src: AIABadge,
    alt: "AIA badge",
    text: "AIA Certified",
  },
];

function BadgeCard({ src, alt, size = 55, text }: badgeCardProps) {
  return (
    <article className={styles.badgeCard}>
      <Image src={src} alt={alt} width={size} />
      <p>{text}</p>
    </article>
  );
}

function IntroSection({ content }: { content: Content }) {
  return (
    <section className={styles.introSection}>
      <div className={styles.textContainer}>
        <h2>{content.header}</h2>
        <p>{content.subtext}</p>
      </div>
      <div className={styles.badgesContainer}>
        {badges.map((item, i) => (
          <BadgeCard key={i} src={item.src} alt={item.alt} text={item.text} />
        ))}
      </div>
    </section>
  );
}

export default IntroSection;
