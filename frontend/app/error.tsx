"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  console.log(error);
  return <h2>Error fetching data</h2>;
}
