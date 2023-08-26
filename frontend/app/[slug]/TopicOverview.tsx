"use client";

import { Box, Flex, UnorderedList, ListItem, Text, Button } from "@chakra-ui/react";
import styles from "./page.module.scss";
import HTML5Logo from "@/media/HTML5Logo.svg";
import Image from "next/image";

interface Props {
  topic: Topic;
  params: {
    slug: string;
  };
}

export default function TopicOverview({ topic, params }: Props) {
  const taskNumber = topic.chapters!.flatMap((el) => el.tasks).length;

  return (
    <Box className={styles.main} maxW={960} m={"auto"} my={10}>
      <Flex justify={"left"} gap={7} align={"center"} mb={5}>
        <Image src={HTML5Logo} height={150} alt="logo" />
        <h1>{topic.title}</h1>
      </Flex>

      <Box py={4}>
        <Text>
          In this topic, you will explore the basics of HTML. This topic consists of{" "}
          <b>{topic.chapters!.length} chapters </b> totalling to <b>{taskNumber} tasks</b>.
        </Text>

        <Text fontSize={"1.5rem"} pt={3} pb={2}>
          Chapters
        </Text>
        <UnorderedList>
          {topic.chapters!.map((chapter) => (
            <ListItem key={topic.id}>{chapter.title}</ListItem>
          ))}
        </UnorderedList>
        <Button as={"a"} href={`${topic.slug}/challenge/1`} my={3} size={"lg"} colorScheme={"green"}>
          Get Started
        </Button>
      </Box>
    </Box>
  );
}
