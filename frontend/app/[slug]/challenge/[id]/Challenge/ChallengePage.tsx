"use client";
import { Session } from "next-auth";

import Sidebar from "@/app/[slug]/challenge/[id]/Challenge/Sidebar/Sidebar";
import Challenge from "@/app/[slug]/challenge/[id]/Challenge/Main/Challenge";
import { useState, experimental_useOptimistic as useOptimistic } from "react";
import { createCompleteStatus } from "./actions";
import { useToast } from "@chakra-ui/react";

interface Props {
  topic: Topic;
  tasksData: TaskData[] | undefined;
  session: Session | null;
  params: {
    slug: string;
    id: string;
  };
}

export default function ChallengePage({ params, topic, tasksData, session }: Props) {
  const toast = useToast();
  const [notLoggedInInfoShown, setNotLoggedInInfoShown] = useState(false);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasksData || []);

  async function onSubmitTask(formData: FormData) {
    const data = Object.fromEntries(formData);

    let optimisticTask: TaskData;

    if (data.id) {
      optimisticTask = {
        id: +data.id,
        task: +data.task,
        html_code: data.html_code.toString(),
        css_code: data.css_code.toString(),
        completed: true,
      };

      let newTasks = optimisticTasks?.filter((task) => task.task !== +params.id)!;
      setOptimisticTasks((tasks) => [...newTasks, optimisticTask]);
    } else {
      optimisticTask = {
        task: +data.task,
        html_code: data.html_code.toString(),
        css_code: data.css_code.toString(),
        completed: true,
      };

      setOptimisticTasks((tasks) => [...tasks!, optimisticTask]);
    }

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
    <main>
      <form action={onSubmitTask}>
        <Sidebar topic={topic} tasksData={optimisticTasks} params={params} />
        <Challenge
          topic={topic}
          taskData={optimisticTasks?.find((el) => +el.task === +params.id)}
          params={params}
          session={session}
        />
      </form>
    </main>
  );
}
