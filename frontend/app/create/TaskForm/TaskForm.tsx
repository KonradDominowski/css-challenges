"use client";

import { useEffect, useState } from "react";

import SidebarForm from "@/app/create/TaskForm/SidebarForm";
import ChallengeForm from "@/app/create/TaskForm/ChallengeForm";
import createTask from "@/app/create/actions";
import { useToast } from "@chakra-ui/react";
import { revalidatePath } from "next/cache";

interface data {
  title: string;
  description: string;
  target: string;
  order: number;
  chapter: number;
}

export default function TaskForm({ topics, chapters }: { topics: Topic[]; chapters: Chapter[] }) {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [topicID, setTopicID] = useState(0);
  const [chapterID, setChapterID] = useState(0);
  const [taskOrder, setTaskOrder] = useState(0);
  const [formIsFilled, setFormIsFilled] = useState(false);
  const [HTMLcode, setHTMLcode] = useState<string>("");
  const [CSScode, setCSScode] = useState<string>("");

  const clearForm = () => {
    setChapterID(0);
    setTitle("");
    setDescription("");
    setHTMLcode("");
    setCSScode("");
  };

  async function onCreateTask(formData: FormData) {
    const res = await createTask(formData);

    if (res.status === "success") {
      toast({
        position: "top",
        title: "Success!",
        description: "Task added successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      clearForm();
    } else {
      toast({
        position: "top",
        title: "Oops!",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if ([title, description, srcDoc, topicID, chapterID, taskOrder].every((el) => Boolean(el) === true)) {
      setFormIsFilled(true);
    } else {
      setFormIsFilled(false);
    }
  }, [title, description, srcDoc, topicID, chapterID, taskOrder]);

  return (
    <form action={onCreateTask}>
      <SidebarForm
        formIsFilled={formIsFilled}
        topics={topics}
        chapters={chapters}
        topicID={topicID}
        setTopicID={setTopicID}
        chapterID={chapterID}
        setChapterID={setChapterID}
        taskOrder={taskOrder}
        setTaskOrder={setTaskOrder}
      />
      <ChallengeForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        srcDoc={srcDoc}
        setSrcDoc={setSrcDoc}
        HTMLcode={HTMLcode}
        setHTMLcode={setHTMLcode}
        CSScode={CSScode}
        setCSScode={setCSScode}
      />
    </form>
  );
}
