import { Lang } from "@/lib/types";
import { getDictionary } from "@/lib/utils";
import PageHeader from "@/components/PageHeader/PageHeader";
import DisciplinesDetail from "@/components/DisciplinesDetail/DisciplinesDetail";
import CapabilitiesGrid from "@/components/CapabilitiesGrid/CapabilitiesGrid";
import StandardsBar from "@/components/StandardsBar/StandardsBar";
import CtaSection from "@/components/CtaSection/CtaSection";

interface ServicesPageProps {
  params: Promise<{ lang: Lang }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params;
  const content = getDictionary(lang);

  return (
    <main>
      <PageHeader content={content.servicesPage.header} />
      <DisciplinesDetail content={content.servicesPage.disciplines} />
      <CapabilitiesGrid content={content.servicesPage.capabilities} />
      <StandardsBar content={content.servicesPage.standards} />
      <CtaSection content={content.cta} />
    </main>
  );
}
