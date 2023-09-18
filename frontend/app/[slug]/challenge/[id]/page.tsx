import { getServerSession } from "next-auth/next";

import fetchTopic from "@/functions/fetchTopic";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChallengePage from "@/app/[slug]/challenge/[id]/Challenge/ChallengePage";

interface Props {
  params: {
    slug: string;
    id: string;
  };
}

export default async function ChallengeLayout({ params }: Props) {
  const session = await getServerSession(authOptions);

  let tasksData: TaskData[] | undefined = undefined;

  if (session) {
    const response = await fetch("http://localhost:8000/api/tasks-users/", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { tags: ["userTasks"] },
    });

    tasksData = await response.json();
  }

  const topicData = fetchTopic(params.slug);
  const topic: Topic = await topicData;


  return <ChallengePage topic={topic} tasksData={tasksData} params={params} session={session} />;
}
