import { Chapter } from "@/public/challenges";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";
import { Link } from "@chakra-ui/next-js";

export default function Chapter({ chapter }: { chapter: Chapter }) {
  return (
    <Accordion allowToggle>
      <AccordionItem border={"none"}>
        <h2>
          <AccordionButton>
            <Box as="span" fontSize={"1rem"} flex="1" textAlign="left" color={"gray.500"} fontWeight={500}>
              {chapter.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel py={0} px={0}>
          <List>
            {chapter.tasks.map((task) => (
              <Link href={`${task.id}`}>
                <ListItem key={task.id} color={"gray.500"} fontSize={"0.9rem"} py={1.5} px={4}>
                  <ListIcon
                    as={task.id === 1 ? MdCheckCircle : MdCheckCircleOutline}
                    color={task.id === 1 ? "green.500" : ""}
                  />
                  {task.title}
                </ListItem>
              </Link>
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
