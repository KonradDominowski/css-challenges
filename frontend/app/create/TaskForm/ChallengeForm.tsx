"use client";

import CodeEditor from "@/app/components/Editors";
import { Box, Card, CardHeader, Divider, Flex, Textarea, VisuallyHiddenInput } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import styles from "./ChallengeForm.module.scss";

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  HTMLcode: string;
  setHTMLcode: React.Dispatch<React.SetStateAction<string>>;
  CSScode: string;
  setCSScode: React.Dispatch<React.SetStateAction<string>>;
  srcDoc: string;
  setSrcDoc: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChallengeForm({
  title,
  setTitle,
  description,
  setDescription,
  srcDoc,
  setSrcDoc,
  HTMLcode,
  setHTMLcode,
  CSScode,
  setCSScode,
}: Props) {
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

  return (
    <div className={styles.main} id="main">
      <Flex alignItems={"center"} justify={"left"} pt={4}>
        <Textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          p={0}
          fontSize={"3rem"}
          placeholder="Title placeholder"
          resize={"none"}
          borderColor={"rgba(0,0,0,0)"}
        />
      </Flex>
      <Textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.description}
        p={0}
        placeholder="Put task description here"
        resize={"vertical"}
        borderColor={"rgba(0,0,0,0)"}
      />
      <div>
        <Box minW={"600px"} maxW={"100%"} resize={"horizontal"} overflow={"auto"}>
          <Card px={5} my={3} flexGrow={1}>
            <CardHeader p={4} pb={3} color={"gray"} fontWeight={500}>
              Output
            </CardHeader>
            <Divider color={"gray.200"} />
            <iframe id="target" title="target" height={300} sandbox="allow-scripts " srcDoc={srcDoc} />
          </Card>
        </Box>
        <VisuallyHiddenInput type="text" name="target" readOnly value={srcDoc} />
        <CodeEditor HTMLcode={HTMLcode} setHTMLcode={setHTMLcode} CSScode={CSScode} setCSScode={setCSScode} />
      </div>
    </div>
  );
}
