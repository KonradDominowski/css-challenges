import { getServerSession } from "next-auth/next";

import fetchTopic from "@/functions/fetchTopic";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "@/app/components/Challenge/Sidebar/Sidebar";
import Challenge from "@/app/components/Challenge/Main/Challenge";

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
    });

    tasksData = await response.json();
  }

  const topicData = fetchTopic(params.slug);
  const topic = await topicData;

  return (
    <main>
      <Sidebar topic={topic} tasksData={tasksData} params={params} />
      <Challenge
        topic={topic}
        taskData={tasksData?.find((el) => +el.task === +params.id)}
        params={params}
        session={session}
      />
    </main>
  );
}
