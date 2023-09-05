import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";

import Body from "./components/Body";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "CSS Challenges",
  description: "Generated by create next app",
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  let tasksData;

  if (session) {
    const response = await fetch("http://localhost:8000/api/tasks-users/", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    tasksData = await response.json();
  }

  const topicsResponse = await fetch("http://localhost:8000/api/topics/");
  const topics = await topicsResponse.json();

  return (
    <>
      <Body topics={topics} />
    </>
  );
}
