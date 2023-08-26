import type { Metadata } from "next";

import Body from "./components/Body";

export const metadata: Metadata = {
  title: "CSS Challenges",
  description: "Generated by create next app",
};

export default async function Home() {
  const topicsResponse = await fetch("http://localhost:8000/api/topics/");
  const topics = await topicsResponse.json();

  return (
    <>
      <Body topics={topics} />
    </>
  );
}
