import {
  Box,
  Card,
  CardHeader,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";

export default function TargetAndOutput({ target, output }: { target: string; output: string }) {
  const [showDiff, setShowDiff] = useState(false);
  // TODO - tab indicator
  return (
    <Flex gap={3} my={3} flexDirection={{ base: "column-reverse", lg: "row" }}>
      <Card px={5} flexGrow={1}>
        <Tabs>
          <CardHeader color={"gray"} p={0}>
            <TabList pos={"relative"}>
              <Tab py={4} pb={3}>
                Output
              </Tab>
              <Tab py={4} pb={3}>
                Target
              </Tab>
              <Checkbox onChange={() => setShowDiff((state) => !state)}>Show diff</Checkbox>
            </TabList>
          </CardHeader>
          <TabPanels>
            <TabPanel p={0} position={"relative"}>
              <Box
                pos={"absolute"}
                bgColor={"black"}
                top={0}
                left={0}
                width={"100%"}
                mixBlendMode={"difference"}
                display={showDiff ? "block" : "none"}
              >
                <iframe title="target" height={300} sandbox="allow-scripts" width="100%" srcDoc={target} />
              </Box>
              <Box>
                <iframe title="output" height={300} sandbox="allow-scripts" width="100%" srcDoc={output} />
              </Box>
            </TabPanel>
            <TabPanel p={0}>
              <iframe title="target" height={300} sandbox="allow-scripts" width="100%" srcDoc={target} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
      <Card px={5} flexGrow={1}>
        <CardHeader p={4} pb={3} color={"gray"} fontWeight={500}>
          Target
        </CardHeader>
        <Divider color={"gray.200"} />
        <iframe id="target" title="target" height={300} sandbox="allow-scripts " srcDoc={target} />
      </Card>
    </Flex>
  );
}
