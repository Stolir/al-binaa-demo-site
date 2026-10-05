import { Lang } from "@/lib/types";
import { getDictionary } from "@/lib/utils";
import PageHeader from "@/components/PageHeader/PageHeader";
import SplitContactSection from "@/components/SplitContactSection/SplitContactSection";
import OfficeLocationsGrid from "@/components/OfficeLocationsGrid/OfficeLocationsGrid";
import FaqAccordion from "@/components/FaqAccordion/FaqAccordion";

interface ContactPageProps {
  params: Promise<{ lang: Lang }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  const content = getDictionary(lang);

  return (
    <main>
      <PageHeader content={content.contactPage.header} />
      <SplitContactSection content={content.contactPage.splitContact} />
      <OfficeLocationsGrid content={content.contactPage.offices} />
      <FaqAccordion content={content.contactPage.faq} />
    </main>
  );
}
