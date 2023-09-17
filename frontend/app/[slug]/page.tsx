import fetchTopic from "@/functions/fetchTopic";
import TopicOverview from "./TopicOverview";

interface Props {
  params: {
    slug: string;
  };
}

export default async function SectionPage({ params }: Props) {
  const topicData: Promise<Topic> = fetchTopic(params.slug);
  const topic = await topicData;

  return <TopicOverview topic={topic} params={params} />;
}
