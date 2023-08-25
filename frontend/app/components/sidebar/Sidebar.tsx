import React from "react";
import styles from "./Sidebar.module.scss";

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
import { MdCheckCircle } from "react-icons/md";
import { Challenge } from "@/public/challenges";
import Chapter from "./Chapter";

interface Props {
  section: Challenge;
}
export default function Sidebar({ section }: Props) {
  return (
    <nav className={styles.sidebar}>
      <Accordion allowToggle defaultIndex={[0]}>
        <AccordionItem border={"none"}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" color={"gray.600"} fontWeight={500}>
                {section.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pl={1} pr={1} pt={0}>
            {section.chapters.map((chapter) => (
              <Chapter key={chapter.id} chapter={chapter} />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </nav>
  );
}
