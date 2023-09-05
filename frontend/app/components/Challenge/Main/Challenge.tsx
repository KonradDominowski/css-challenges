"use client";
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Button, Box, Checkbox, Flex, IconButton, Link, VisuallyHiddenInput } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import CodeEditor from "@/app/components/Editors";
import TargetAndOutput from "@/app/components/TargetAndOutput";
import { createCompleteStatus } from "../actions";

import styles from "./Challenge.module.scss";

interface Props {
  topic: Topic;
  taskData: TaskData | undefined;
  session: Session;
  params: {
    slug: string;
    id: string;
  };
}

// TODO - set the initial value to state loaded from database for the completed tasks
// TODO - Kiedy się kliknie na opis, może się zwinąć
// TODO - link do następnego i poprzedniego challengu kieruje na ID w bazie danych, na razie ono istnieje ale kiedyś mogą się pojebać, może zamiast id uży pola order
export default function Challenge({ params, topic, taskData, session }: Props) {
  const [htmlCode, setHtmlCode] = useState<string>(taskData?.htmlCode || "");
  const [cssCode, setCssCode] = useState<string>(taskData?.cssCode || "");
  const [srcDoc, setSrcDoc] = useState<string>("");

  const task = topic.chapters!.flatMap((chapter) => chapter.tasks).find((task) => task.id === +params.id);

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

  async function onSubmitTask(formData: FormData) {
    console.log("run submit");
    const res = await createCompleteStatus(formData, session);

    console.log(res);
  }

  const updateCompleteStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    const accessToken = localStorage.getItem("accessToken");
    e.preventDefault();
    console.log("form submit");
    return;

    // let completed;
    // if (taskData?.completed === true) {
    //   completed = false;
    // } else {
    //   completed = true;
    // }

    try {
      if (taskData) {
        const newStatus = {
          id: taskData?.id,
          task: params.id,
          html_code: htmlCode,
          css_code: cssCode,
          completed: true,
        };

        const res = await fetch(`http://localhost:8000/api/tasks-users/${taskData?.id}/`, {
          method: "put",
          body: JSON.stringify(newStatus),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed updating task");
      } else {
        const newStatus = {
          task: params.id,
          html_code: htmlCode,
          css_code: cssCode,
          completed: true,
        };

        const res = await fetch(`http://localhost:8000/api/tasks-users/`, {
          method: "post",
          body: JSON.stringify(newStatus),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed submitting task");
      }
    } catch (err) {
      console.log(err);
      ``;
    }
  };

  // TODO - maybe handle submitting task completeness differently

  return (
    <form action={onSubmitTask}>
      <div className={styles.main} id="main">
        <Flex alignItems={"center"} justify={"space-between"}>
          <h1>{task!.title}</h1>
          <Flex>
            <Link href={`${+params.id - 1}`}>
              <IconButton aria-label="" icon={<ArrowLeftIcon />} size={"md"}></IconButton>
            </Link>
            <Button p={0} type="submit" colorScheme={taskData?.completed ? "green" : "gray"}>
              <Checkbox p={4} isChecked={taskData?.completed}>
                {taskData?.completed ? "Done" : "Mark as done"}
              </Checkbox>
            </Button>
            <Link href={`${+params.id + 1}`}>
              <IconButton aria-label="" icon={<ArrowRightIcon />}></IconButton>
            </Link>
          </Flex>
        </Flex>
        <p className={styles.description} id="description" dangerouslySetInnerHTML={{ __html: task!.description }}></p>
        <div>
          <Box minW={"600px"} maxW={"100%"} resize={"horizontal"} overflow={"auto"}>
            <TargetAndOutput target={task!.target} output={srcDoc} />
          </Box>
          <CodeEditor HTMLcode={htmlCode} setHTMLCode={setHtmlCode} CSScode={cssCode} setCSSCode={setCssCode} />
        </div>
        <Button colorScheme="green" type="submit">
          Submit
        </Button>
      </div>
      <VisuallyHiddenInput type="number" name="id" readOnly value={taskData?.id} />
      <VisuallyHiddenInput type="number" name="task" readOnly value={params.id} />
      <VisuallyHiddenInput type="text" name="html_code" readOnly value={htmlCode} />
      <VisuallyHiddenInput type="text" name="css_code" readOnly value={cssCode} />
    </form>
  );
}
