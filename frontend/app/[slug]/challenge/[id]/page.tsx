"use client";
import { useEffect, useState } from "react";

import CodeEditor from "@/app/components/Editors";
import styles from "./page.module.scss";
import CodeSnippet from "@/app/components/CodeSnippet";
import { Button, Box, Checkbox, Flex, IconButton, Link } from "@chakra-ui/react";
import TargetAndOutput from "@/app/components/TargetAndOutput";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import Sidebar from "@/app/components/sidebar/Sidebar";

import challenges from "@/public/challenges";

interface Props {
  params: {
    slug: string;
    id: string;
  };
}

export default function Challenge({ params }: Props) {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [srcDoc, setSrcDoc] = useState<string>("");

  const section = challenges.find((el) => el.slug === params.slug)!;

  const tasks = section.chapters.flatMap((chapter) => chapter.tasks);
  const task = tasks.find((task) => task.id === +params.id);
  const target = `
    <html lang="en">
      <body class='testToImage'>
      <div>
      <h1>Hello world</h1>
      </div>
      </body>
      <style></style>
    </html>
  `;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html lang="en">
        <body>${htmlCode}</body>
        <style>${cssCode}</style>
      </html>
    `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode]);

  return (
    <div className={styles.main} id="main">
      <Flex alignItems={"center"} justify={"space-between"}>
        <h1>{task.title}</h1>
        <Box>
          <Link href={`${+params.id - 1}`}>
            <IconButton aria-label="" icon={<ArrowLeftIcon />} size={"md"}></IconButton>
          </Link>
          <Button p={0}>
            <Checkbox p={4}>Mark as done</Checkbox>
          </Button>
          <Link href={`${+params.id + 1}`}>
            <IconButton aria-label="" icon={<ArrowRightIcon />}></IconButton>
          </Link>
        </Box>
      </Flex>
      {/* <p className={styles.description} id="description">
        The very first thing you see when you visit a webpage is a heading. Heading are created using the
        <CodeSnippet>{"<h1>"}</CodeSnippet> tag
      </p> */}
      <p className={styles.description} id="description">
        {task?.description}
      </p>
      <div>
        <Box minW={"300px"} maxW={"100%"} resize={"horizontal"} overflow={"auto"}>
          <TargetAndOutput target={task?.target} output={srcDoc} />
        </Box>
        <CodeEditor HTMLcode={htmlCode} setHTMLCode={setHtmlCode} CSScode={cssCode} setCSSCode={setCssCode} />
      </div>
      <Button colorScheme="green">Submit</Button>
    </div>
  );
}
