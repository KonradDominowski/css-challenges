"use client";
import React, { useEffect, useState } from "react";

import { Session } from "next-auth";
import { Box, Flex, IconButton, VisuallyHiddenInput, useToast } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import CodeEditor from "@/app/components/Editors";
import TargetAndOutput from "@/app/components/TargetAndOutput";
import { SubmitButton } from "@/app/components/Buttons";
import { createCompleteStatus } from "../actions";

import styles from "./Challenge.module.scss";

interface Props {
  topic: Topic;
  taskData: TaskData | undefined;
  session: Session | null;
  params: {
    slug: string;
    id: string;
  };
}

// TODO - set the initial value to state loaded from database for the completed tasks
// TODO - Kiedy się kliknie na opis, może się zwinąć
// TODO - link do następnego i poprzedniego challengu kieruje na ID w bazie danych, na razie ono istnieje ale kiedyś mogą się pojebać, może zamiast id uży pola order
export default function Challenge({ params, topic, taskData, session }: Props) {
  const toast = useToast();
  const [HTMLcode, setHTMLcode] = useState<string>(taskData?.htmlCode || "");
  const [CSScode, setCSScode] = useState<string>(taskData?.cssCode || "");
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [notLoggedInInfoShown, setNotLoggedInInfoShown] = useState(false);

  const task = topic.chapters!.flatMap((chapter) => chapter.tasks).find((task) => task.id === +params.id);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html lang="en">
        <body>${HTMLcode}</body>
        <style>${CSScode}</style>
      </html>
    `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [HTMLcode, CSScode]);

  async function onSubmitTask(formData: FormData) {
    const res = await createCompleteStatus(formData, session);

    if (res.status === "notLoggedIn") {
      // TODO - save tasks data locally

      if (!notLoggedInInfoShown) {
        setNotLoggedInInfoShown(true);
        toast({
          position: "bottom-left",
          title: "Sign in",
          description: "Sign in to save data to your account, for now your data is saved locally",
          status: "info",
          duration: 12000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <form action={onSubmitTask}>
      <div className={styles.main} id="main">
        <Flex alignItems={"center"} justify={"space-between"}>
          <h1>{task!.title}</h1>
          <Flex>
            <IconButton as={"a"} href={`${+params.id - 1}`} aria-label="" icon={<ArrowLeftIcon />} />
            <SubmitButton completed={taskData?.completed} />
            <IconButton as={"a"} href={`${+params.id - 1}`} aria-label="" icon={<ArrowRightIcon />} />
          </Flex>
        </Flex>
        <p className={styles.description} id="description" dangerouslySetInnerHTML={{ __html: task!.description }}></p>
        <div>
          <Box minW={"600px"} maxW={"100%"} resize={"horizontal"} overflow={"auto"}>
            <TargetAndOutput target={task!.target} output={srcDoc} />
          </Box>
          <CodeEditor HTMLcode={HTMLcode} setHTMLcode={setHTMLcode} CSScode={CSScode} setCSScode={setCSScode} />
        </div>
      </div>
      <VisuallyHiddenInput type="number" name="id" readOnly value={taskData?.id} />
      <VisuallyHiddenInput type="number" name="task" readOnly value={params.id} />
      <VisuallyHiddenInput type="text" name="html_code" readOnly value={HTMLcode} />
      <VisuallyHiddenInput type="text" name="css_code" readOnly value={CSScode} />
    </form>
  );
}
