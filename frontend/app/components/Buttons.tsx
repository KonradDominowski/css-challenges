"use client";

import { Avatar, Button, Checkbox, Icon, Spinner } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { HiCheck } from "react-icons/hi";

import customSignOut from "@/functions/customSignOut";

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

export function SubmitButton({ completed }: { completed: boolean | undefined }) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button isLoading={pending} colorScheme="green" type="submit" isDisabled={pending}>
        {completed ? (
          <>
            <Icon as={HiCheck} mr={1} />
            Done
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </>
  );
}
