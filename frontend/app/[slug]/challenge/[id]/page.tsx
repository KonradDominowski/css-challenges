import Sidebar from "@/app/components/Sidebar/Sidebar";

import Challenge from "@/app/components/Challenge/Challenge";
import fetchTopic from "@/functions/fetchTopic";

interface Props {
  params: {
    slug: string;
    id: string;
  };
}

export default async function ChallengeLayout({ params }: Props) {
  const topicData = fetchTopic(params.slug);
  const topic = await topicData;

  return (
    <main>
      <Sidebar topic={topic} params={params} />
      <Challenge topic={topic} params={params} />
    </main>
  );
}
