"use client";

import Link from "next/link";
import Image from "next/image";
import { nunito } from "../layout";

import { Flex, Box, Button, HStack, useColorModeValue, SystemStyleObject } from "@chakra-ui/react";

import styles from "./NavBar.module.scss";
import alogo from "../../media/alogo.svg";

export default function NavBar() {
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
        </HStack>
      </HStack>

      <div>
        <Button>Sign in</Button>
        <Button>Register</Button>
      </div>
    </Flex>
  );
}
