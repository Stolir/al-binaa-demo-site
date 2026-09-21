import { Lang } from "@/lib/types";
import { getDictionary } from "@/lib/utils";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProjectsFilter from "@/components/ProjectsFilter/ProjectsFilter";
import PortfolioStats from "@/components/PortfolioStats/PortfolioStats";

interface ProjectsPageProps {
  params: Promise<{ lang: Lang }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const content = getDictionary(lang);

  return (
    <main>
      <PageHeader content={content.projectsPage.header} />
      <ProjectsFilter content={content.projectsPage.gallery} />
      <PortfolioStats content={content.projectsPage.stats} />
    </main>
  );
}
