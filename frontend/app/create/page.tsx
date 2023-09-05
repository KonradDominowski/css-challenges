import { getServerSession } from "next-auth";
import TaskForm from "../components/TaskForm/TaskForm";

export default async function CreateChallenge() {
  const session = await getServerSession();

  if (!(session?.user?.email === "konrad.dominowski@gmail.com")) {
    return <p>This page is only available for the admin.</p>;
  }

  const topicsResponse = await fetch("http://localhost:8000/api/topics/");
  const topics: Topic[] = await topicsResponse.json();

  const chaptersResponse = await fetch("http://localhost:8000/api/chapters/");
  const chapters: Chapter[] = await chaptersResponse.json();

  return <TaskForm topics={topics} chapters={chapters} />;
}
