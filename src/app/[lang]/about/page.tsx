import { Lang } from "@/lib/types";
import { getDictionary } from "@/lib/utils";
import PageHeader from "@/components/PageHeader/PageHeader";
import AboutValues from "@/components/AboutValues/AboutValues";
import MilestonesTimeline from "@/components/MilestonesTimeline/MilestonesTimeline";
import LeadershipGrid from "@/components/LeadershipGrid/LeadershipGrid";
import AccreditationStrip from "@/components/AccreditationStrip/AccreditationStrip";

interface AboutPageProps {
  params: Promise<{ lang: Lang }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const content = getDictionary(lang);

  return (
    <main>
      <PageHeader content={content.aboutPage.header} />
      <AboutValues content={content.aboutPage.values} />
      <MilestonesTimeline content={content.aboutPage.milestones} />
      <LeadershipGrid content={content.aboutPage.leadership} />
      <AccreditationStrip content={content.aboutPage.accreditations} />
    </main>
  );
}
