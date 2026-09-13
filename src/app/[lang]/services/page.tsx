import { Lang } from "@/lib/types";
import { getDictionary } from "@/lib/utils";
import PageHeader from "@/components/PageHeader/PageHeader";

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
    </main>
  );
}
