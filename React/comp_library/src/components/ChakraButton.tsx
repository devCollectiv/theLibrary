import { Button } from "@chakra-ui/react";
import React from "react";

const ChakraButton = ({ text }: { text: string }) => {
  return <Button variant={"outline"}>{text}</Button>;
};

export default ChakraButton;
