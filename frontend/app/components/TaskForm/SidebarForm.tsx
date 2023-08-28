"use client";

import React, { useEffect, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { Button, FormLabel, Select, Spinner } from "@chakra-ui/react";

import styles from "./SidebarForm.module.scss";

function range(end: number) {
  if (isNaN(end)) return [1];
  return [...Array(end + 1).keys()].slice(1);
}

interface Props {
  formIsFilled: boolean;
  topics: Topic[];
  chapters: Chapter[];
  topicID: number;
  setTopicID: React.Dispatch<React.SetStateAction<number>>;
  chapterID: number;
  setChapterID: React.Dispatch<React.SetStateAction<number>>;
  taskOrder: number;
  setTaskOrder: React.Dispatch<React.SetStateAction<number>>;
}

export default function SidebarForm({
  formIsFilled,
  topics,
  chapters,
  topicID,
  setTopicID,
  chapterID,
  setChapterID,
  taskOrder,
  setTaskOrder,
}: Props) {
  const { pending } = useFormStatus();
  const [maxOrder, setMaxOrder] = useState<number>(0);

  // If task is taken, disable it in the dropdown list
  function taskIsTaken(taskNumber: number, chap: number) {
    return chapters
      .find((el) => el.id === chap)
      ?.tasks.map((task) => task.order)
      .includes(taskNumber);
  }

  // Set the task number to be placed at the end of task list, if there is no tasks in the chapter set it to 1
  useEffect(() => {
    if (!chapterID) {
      setMaxOrder(0);
      setTaskOrder(0);
      return;
    }

    const maxOrder = chapters
      .find((el) => el.id === chapterID)
      ?.tasks.map((el) => el.order)
      .at(-1);

    setMaxOrder(maxOrder!);
    setTaskOrder(maxOrder! + 1 || 1);
  }, [chapterID]);

  useEffect(() => {
    if (!topicID) setChapterID(0);
  }, [topicID]);

  return (
    <nav className={styles.sidebar}>
      <FormLabel m={0} mt={2} mr={3} fontWeight={700}>
        Topic
      </FormLabel>
      <Select
        name="topic"
        placeholder="Select a topic"
        variant={"flushed"}
        value={topicID}
        onChange={(e) => setTopicID(+e.target.value)}
      >
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.title}
          </option>
        ))}
      </Select>

      <FormLabel m={0} mt={2} mr={3} fontWeight={700}>
        Chapter
      </FormLabel>
      <Select
        name="chapter"
        placeholder="Select chapter"
        variant={"flushed"}
        isDisabled={!topicID}
        value={chapterID}
        onChange={(e) => setChapterID(+e.target.value)}
      >
        {chapters
          .filter((chapter) => chapter.topic === topicID)
          .map((chapter) => (
            <option key={chapter.id} value={chapter.id}>
              {chapter.title}
            </option>
          ))}
      </Select>

      <FormLabel m={0} mt={2} mr={3} fontWeight={700}>
        Task order
      </FormLabel>
      <Select
        name="order"
        placeholder="Select task order"
        variant={"flushed"}
        isDisabled={!chapterID}
        value={taskOrder}
        onChange={(e) => setTaskOrder(+e.target.value)}
      >
        {range(maxOrder + 1).map((el) => (
          <option key={el} disabled={taskIsTaken(el, chapterID)} value={el}>
            {el}
          </option>
        ))}
      </Select>
      <Button isDisabled={!formIsFilled || pending} mt={5} w={"100%"} colorScheme={"green"} type="submit">
        {pending ? <Spinner size={"sm"} /> : "Add Task"}
      </Button>
    </nav>
  );
}
