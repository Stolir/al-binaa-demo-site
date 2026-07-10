import Link from "next/link";
import styles from "./SpecializationsSection.module.css";
import residentialIcon from "../../../public/icons/residential.svg";
import commercialIcon from "../../../public/icons/commercial.svg";
import industryIcon from "../../../public/icons/industry.svg";
import infrastructureIcon from "../../../public/icons/infrastructure.svg";
import Image, { StaticImageData } from "next/image";

type Field = {
  name: string;
  icon: string;
  description: string;
};

type Content = {
  header: string;
  fields: Array<Field>;
};

const iconMap: Record<string, StaticImageData> = {
  residential: residentialIcon,
  commercial: commercialIcon,
  infrastructure: infrastructureIcon,
  industrial: industryIcon,
};

function SpecializationCard({ field }: { field: Field }) {
  return (
    <article className={styles.specializationCard}>
      <Image src={iconMap[field.icon]} alt={field.name} width={35} />
      <p>{field.name}</p>
      <p>{field.description}</p>
      <Link href={"/services"}>Learn More</Link>
    </article>
  );
}

function SpecializationsSection({ content }: { content: Content }) {
  return (
    <section className={styles.specializationSection}>
      <h2>{content.header}</h2>
      <div className={styles.cardContainer}>
        {content.fields.map((field, i) => (
          <SpecializationCard key={i} field={field} />
        ))}
      </div>
    </section>
  );
}

export default SpecializationsSection;
