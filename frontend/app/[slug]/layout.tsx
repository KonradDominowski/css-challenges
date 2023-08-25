"use client";
import Sidebar from "@/app/components/sidebar/Sidebar";
import React from "react";

import challenges from "@/public/challenges";
interface Props {
  children: React.ReactNode;
  params: {
    slug: string;
    id: string;
  };
}
export default function ChallengeLayout({ children, params }: Props) {
  const section = challenges.find((el) => el.slug === params.slug)!;

  return (
    <main>
      <Sidebar section={section} />
      {children}
    </main>
  );
}
