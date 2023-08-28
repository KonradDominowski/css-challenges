import { cache } from "react";

export default async function fetchTopic(slug: string) {
  const topicRes = await fetch(`http://localhost:8000/api/topics/${slug}/`, { cache: "no-store" });

  if (!topicRes.ok) throw new Error();

  return topicRes.json();
}
