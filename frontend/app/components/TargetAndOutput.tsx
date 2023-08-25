import { Box, Card, CardHeader, Divider, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export default function TargetAndOutput({ target, output }: { target: string; output: string }) {
  // TODO - tab indicator
  return (
    <Box>
      <Card px={5} my={3}>
        <CardHeader p={4} pb={3} color={"gray"} fontWeight={500}>
          Target
        </CardHeader>
        <Divider color={"gray.200"} />
        <iframe id="target" title="output" sandbox="allow-scripts" height="100%" width="100%" srcDoc={target} />
      </Card>
      <Card px={5} my={3}>
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
              <iframe title="output" sandbox="allow-scripts" height="100%" width="100%" srcDoc={output} />
            </TabPanel>
            <TabPanel p={0}>
              <iframe title="output" sandbox="allow-scripts" height="100%" width="100%" srcDoc={target} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Box>
  );
}
