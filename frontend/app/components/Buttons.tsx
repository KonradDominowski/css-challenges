"use client";

import customSignOut from "@/functions/customSignOut";
import { Avatar, Button } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <Link href={`/dashboard`}>
        <Avatar name={session.user?.image!} src={session.user?.image!} size={"sm"} />
      </Link>
    );
  }

  return <Button onClick={() => signIn()}>Sign in</Button>;
}

export function SignOutButton() {
  return <Button onClick={() => customSignOut()}>Sign out</Button>;
}
