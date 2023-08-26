export default async function fetchTopic(slug: string) {
  const topicRes = await fetch(`http://localhost:8000/api/topics/${slug}/`);

  if (!topicRes.ok) throw new Error();

  return topicRes.json();
}
