"use client";

import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <Link href={`/dashboard`}>
        <Image src={session.user?.image ?? "/mememan.webp"} width={32} height={32} alt="Your Name" />
      </Link>
    );
  }

  return <Button onClick={() => signIn()}>Sign in</Button>;
}

export function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign out</Button>;
}
