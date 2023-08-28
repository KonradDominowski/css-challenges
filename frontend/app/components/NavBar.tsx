"use client";
import { Flex, Box, Button, HStack, useColorModeValue, SystemStyleObject } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import Providers from "../providers/providers";
import { nunito } from "./../layout";
import styles from "./NavBar.module.scss";
import alogo from "../../media/alogo.svg";
import { SignInButton, SignOutButton } from "./Buttons";

export default function NavBar() {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

  const linkColor = useColorModeValue("rgb(100, 100, 100)", "rgb(240,240,240)");
  const linkColorHover = useColorModeValue("rgb(0, 0, 0)", "rgb(255,255,255)");

  const navBorder: SystemStyleObject = {
    border: "solid 0.5px",
    borderImage: `linear-gradient(90deg,
      rgba(48, 48, 255, 0) 0%,
      var(--main-color-dimmed) 40%,
      var(--main-color-dimmed) 60%,
      rgba(48, 48, 255, 0) 100%)`,
    borderImageSlice: `0 0 100 0`,
  };

  return (
    <Flex
      as="nav"
      className={nunito.className}
      align={"center"}
      justify={"space-between"}
      position={"sticky"}
      top={0}
      zIndex={10}
      height={"4rem"}
      fontWeight={700}
      sx={navBorder}
    >
      <HStack>
        <Link href={"/"}>
          <Image className={styles.logo} src={alogo} alt="logo" />
        </Link>
        <HStack align={"center"} paddingLeft={"1rem"} fontSize={"medium"} spacing={2}>
          <Box
            as={"a"}
            p={2}
            href="/"
            transition={"0.1s"}
            color={linkColor}
            _hover={{
              color: linkColorHover,
            }}
          >
            Home
          </Box>
          <Box
            as={"a"}
            p={2}
            href="#"
            transition={"0.1s"}
            color={linkColor}
            _hover={{
              color: linkColorHover,
            }}
          >
            Link 1
          </Box>
          <Box
            as={"a"}
            p={2}
            href="#"
            transition={"0.1s"}
            color={linkColor}
            _hover={{
              color: linkColorHover,
            }}
          >
            Link 1
          </Box>
          <Box
            as={"a"}
            p={2}
            href="/create"
            transition={"0.1s"}
            color={linkColor}
            _hover={{
              color: linkColorHover,
            }}
          >
            Add new task
          </Box>
        </HStack>
      </HStack>

      <Flex>
        <SignInButton />
        {status === "authenticated" && <SignOutButton />}
      </Flex>
    </Flex>
  );
}
