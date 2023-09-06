import fetchTopic from "@/functions/fetchTopic";
import TopicOverview from "./TopicOverview";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface Props {
  params: {
    slug: string;
  };
}

// TODO - W tej sesji na serwerze jest zapisany accessToken, więc można zrobić fetcha Tasków bezpośrednio stąd albo z innego komponentu serwerowego
export default async function SectionPage({ params }: Props) {
  const topicData: Promise<Topic> = fetchTopic(params.slug);
  const topic = await topicData;

  return <TopicOverview topic={topic} params={params} />;
}
