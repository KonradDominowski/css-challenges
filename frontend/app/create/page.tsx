import TaskForm from "../components/TaskForm/TaskForm";

export default async function CreateChallenge() {
  const topicsResponse = await fetch("http://localhost:8000/api/topics/");
  const topics: Topic[] = await topicsResponse.json();

  const chaptersResponse = await fetch("http://localhost:8000/api/chapters/");
  const chapters: Chapter[] = await chaptersResponse.json();

  return <TaskForm topics={topics} chapters={chapters} />;
}
