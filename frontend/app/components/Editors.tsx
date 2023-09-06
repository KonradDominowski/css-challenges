import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import {
  Tabs,
  Tab,
  TabIndicator,
  TabList,
  TabPanels,
  TabPanel,
  Flex,
  Box,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { EditorView } from "codemirror";

import { JoinIcon, SplitIcon } from "@/app/components/Icons";

interface Props {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

interface JoinedProps {
  HTMLcode: string;
  setHTMLcode: React.Dispatch<React.SetStateAction<string>>;
  CSScode: string;
  setCSScode: React.Dispatch<React.SetStateAction<string>>;
}

const myTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#011627",
    foreground: "#ffffff",
    caret: "#AEAFAD",
    selectionMatch: "#D6D6D6",
  },

  styles: [
    { tag: t.comment, color: "#787b80" },
    { tag: t.definition(t.typeName), color: "#194a7b" },
    { tag: t.typeName, color: "#194a7b" },
    { tag: t.tagName, color: "#FFCB8B" },
    { tag: t.variableName, color: "#1a00db" },
    { tag: t.angleBracket, color: "#C792EA" },
    { tag: t.attributeName, color: "#ADDB67" },
    { tag: t.attributeValue, color: "#7FDBCA" },
    { tag: t.content, color: "#ffffff" },
  ],
});

function HTMLEditor({ code, setCode }: Props) {
  const handleChange = (input: string) => {
    setCode(input);
  };

  return (
    <CodeMirror
      theme={myTheme}
      value={code}
      minHeight="160px"
      extensions={[html(), EditorView.lineWrapping]}
      onChange={handleChange}
      placeholder={"// Enter your HTML code here \n \n \n \n \n \n \n "}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
        highlightActiveLine: false,
      }}
    />
  );
}

function CSSEditor({ code, setCode }: Props) {
  const handleChange = (input: string) => {
    setCode(input);
  };

  return (
    <CodeMirror
      theme={myTheme}
      value={code}
      minHeight="160px"
      extensions={[css(), EditorView.lineWrapping]}
      onChange={handleChange}
      placeholder={"// Enter your CSS code here \n \n \n \n \n \n \n "}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
        highlightActiveLine: false,
      }}
    />
  );
}

export default function CodeEditor({ HTMLcode, setHTMLcode, CSScode, setCSScode }: JoinedProps) {
  const [isSplit, setIsSplit] = useState(false);

  const toggleSplit = () => {
    setIsSplit((state) => !state);
  };

  return (
    <Box my={1} px={4} py={2} minHeight={"256px"} bgColor={"#011627"} borderRadius={10} pos={"relative"}>
      <IconButton
        aria-label="Split editors"
        pos={"absolute"}
        right={4}
        top={3}
        size={"sm"}
        icon={
          isSplit ? (
            <Tooltip label="Join editors" fontSize="xs" borderRadius={5}>
              <JoinIcon />
            </Tooltip>
          ) : (
            <Tooltip label="Split Editors" fontSize="xs" borderRadius={5}>
              <SplitIcon />
            </Tooltip>
          )
        }
        onClick={toggleSplit}
      />
      {!isSplit ? (
        <Tabs variant={"unstyled"}>
          <TabList color={"white"}>
            <Tab>HTML</Tab>
            <Tab>CSS</Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <HTMLEditor code={HTMLcode} setCode={setHTMLcode} />
            </TabPanel>
            <TabPanel>
              <CSSEditor code={CSScode} setCode={setCSScode} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Flex>
          <Box w={"50%"}>
            <Tabs variant={"unstyled"}>
              <TabList color={"white"}>
                <Tab>HTML</Tab>
              </TabList>
              <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
              <TabPanels>
                <TabPanel>
                  <HTMLEditor code={HTMLcode} setCode={setHTMLcode} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <Box
            sx={{
              border: "solid 1px",
              borderImage: `linear-gradient(0deg,
     rgba(255,255,255,0) 5%,
     rgba(255,255,255,0.25) 5%,
     rgba(255,255,255,0.25) 95%,
     rgba(255,255,255, 0) 95%);`,
              borderImageSlice: `0 0 0 100`,
              mx: 3,
            }}
          />
          <Box w={"50%"}>
            <Tabs variant={"unstyled"}>
              <TabList color={"white"}>
                <Tab>CSS</Tab>
              </TabList>
              <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
              <TabPanels>
                <TabPanel>
                  <CSSEditor code={CSScode} setCode={setCSScode} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      )}
    </Box>
  );
}
