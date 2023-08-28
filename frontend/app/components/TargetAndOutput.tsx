import { Box, Card, CardHeader, Divider, Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function TargetAndOutput({ target, output }: { target: string; output: string }) {
  // TODO - tab indicator
  return (
    <Flex gap={3} my={3} flexDirection={{ base: "column-reverse", lg: "row" }}>
      <Card px={5} flexGrow={1}>
        <Tabs>
          <CardHeader color={"gray"} p={0}>
            <TabList>
              <Tab py={4} pb={3}>
                Output
              </Tab>
              <Tab py={4} pb={3}>
                Target
              </Tab>
            </TabList>
          </CardHeader>
          <TabPanels>
            <TabPanel p={0}>
              <iframe title="output" height={300} sandbox="allow-scripts" width="100%" srcDoc={output} />
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
