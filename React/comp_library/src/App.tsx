import {
  Card,
  ChakraProvider,
  Code,
  Container,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <Container size={"xl"} >
        <VStack height="100%">
          <Card p={100} fontSize={24} verticalAlign={"center"}>
            <Text>This app should be viewed via storybook.</Text>
            <Text>
              Run the <Code>npm run storybook</Code> command.
            </Text>
            <Text>
              Then load localhost:6006.
            </Text>
          </Card>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
