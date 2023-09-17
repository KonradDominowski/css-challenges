"use client";
import styles from "./Sidebar.module.scss";

import { Text, List, ListItem, Button, Icon, Spinner } from "@chakra-ui/react";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface Props {
  topic: Topic | undefined;
  tasksData: TaskData[] | undefined;
  params: {
    slug: string;
    id: string;
  };
}

export default function Sidebar({ topic, params, tasksData }: Props) {
  const { pending } = useFormStatus();

  return (
    <nav className={styles.sidebar}>
      <Text as={"span"} color={"gray.700"} py={2} px={4} display={"flex"} justifyContent={"left"} fontWeight={600}>
        {topic?.title}
      </Text>
      <List>
        {topic?.chapters?.map((chapter) => (
          <ListItem
            key={chapter.id}
            as={"span"}
            color={"gray.600"}
            fontWeight={500}
            py={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"left"}
            flexDir={"column"}
          >
            <Text pb={1} px={5}>
              {chapter.title}
            </Text>
            <List>
              {chapter.tasks.map((task) => {
                const completed = tasksData?.find((el) => el.task === task.id)?.completed;

                return (
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
                      <Icon as={completed ? MdCheckCircle : MdCheckCircleOutline} color={"green.500"} /> {task.title}
                      {pending && task.id === +params.id && <Spinner size={"xs"} position={"absolute"} right={"5px"} />}
                    </ListItem>
                  </Button>
                );
              })}
            </List>
          </ListItem>
        ))}
      </List>
    </nav>
  );
}
