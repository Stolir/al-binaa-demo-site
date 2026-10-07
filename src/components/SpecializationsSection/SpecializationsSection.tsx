import Link from "next/link";
import styles from "./SpecializationsSection.module.css";
import residentialIcon from "../../../public/icons/residential.svg";
import commercialIcon from "../../../public/icons/commercial.svg";
import industryIcon from "../../../public/icons/industry.svg";
import infrastructureIcon from "../../../public/icons/infrastructure.svg";
import Image, { StaticImageData } from "next/image";
import { Lang } from "@/lib/types";

type Field = {
  name: string;
  icon: string;
  description: string;
};

type Content = {
  header: string;
  fields: Array<Field>;
  cta: string;
};

interface SpecializationsSectionProps {
  content: Content;
  lang?: Lang;
}

const iconMap: Record<string, StaticImageData> = {
  residential: residentialIcon,
  commercial: commercialIcon,
  infrastructure: infrastructureIcon,
  industrial: industryIcon,
};

function SpecializationCard({
  field,
  cta,
  lang = "en",
}: {
  field: Field;
  cta: string;
  lang?: Lang;
}) {
  return (
    <article className={styles.specializationCard}>
      <Image src={iconMap[field.icon]} alt={field.name} width={35} />
      <p>{field.name}</p>
      <p>{field.description}</p>
      <Link href={`/${lang}/services`}>{cta}</Link>
    </article>
  );
}

function SpecializationsSection({
  content,
  lang = "en",
}: SpecializationsSectionProps) {
  return (
    <section className={styles.specializationSection}>
      <h2>{content.header}</h2>
      <div className={styles.cardContainer}>
        {content.fields.map((field, i) => (
          <SpecializationCard
            key={i}
            field={field}
            cta={content.cta}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}

export default SpecializationsSection;
