import { getServerSession } from "next-auth";
import TaskForm from "./TaskForm/TaskForm";

export default async function CreateChallenge() {
  const session = await getServerSession();

  if (!(session?.user?.email === "konrad.dominowski@gmail.com")) {
    return <p>This page is only available for the admin.</p>;
  }

  const topicsResponse = await fetch(`${process.env.BACKEND_URL}/api/topics/`);
  const topics: Topic[] = await topicsResponse.json();

  const chaptersResponse = await fetch(`${process.env.BACKEND_URL}/api/chapters/`);
  const chapters: Chapter[] = await chaptersResponse.json();

  return <TaskForm topics={topics} chapters={chapters} />;
}
