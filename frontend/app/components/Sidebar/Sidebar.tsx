"use client";

import React from "react";
import styles from "./Sidebar.module.scss";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { Challenge } from "@/public/challenges";

interface Props {
  topic: Challenge;
  params: {
    slug: string;
    id: string;
  };
}
export default function Sidebar({ topic, params }: Props) {
  return (
    <nav className={styles.sidebar}>
      <Text as={"span"} color={"gray.700"} py={2} px={4} display={"flex"} justifyContent={"left"} fontWeight={500}>
        HTML Basics
      </Text>
      <List>
        {topic.chapters.map((chapter) => (
          <ListItem
            key={chapter.id}
            as={"span"}
            color={"gray.600"}
            fontWeight={500}
            py={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"left"}
            flexDir={"column"}
          >
            <Text pb={1} px={5}>
              {chapter.title}
            </Text>
            <List>
              {chapter.tasks.map((task) => (
                <Button
                  key={task.id}
                  as={"a"}
                  href={`${task.id}`}
                  h={9}
                  pl={5}
                  borderRadius={"none"}
                  display={"flex"}
                  justifyContent={"left"}
                  variant={"ghost"}
                  cursor={"pointer"}
                  width={"100%"}
                  color={"gray.500"}
                  fontWeight={400}
                  fontSize={"0.9rem"}
                  _hover={{ backgroundColor: "rgb(230, 230, 230)" }}
                  _active={{ backgroundColor: "rgb(235, 235, 235)" }}
                  isActive={+params.id === task.id}
                >
                  <ListItem key={task.id} display={"flex"} gap={2}>
                    <Icon as={MdCheckCircle} color={"green.500"} /> {task.title}
                  </ListItem>
                </Button>
              ))}
            </List>
          </ListItem>
        ))}
      </List>
    </nav>
  );
}
