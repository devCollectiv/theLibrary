import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon_color = useColorModeValue(
    "colors.brand.secondary.900",
    "colors.brand.primary.900",
  );
  return (
    <FormControl paddingInline={2} maxW={20} color={icon_color}>
      <FormLabel htmlFor="colorMode" display={"none"} />
      <Switch
        id="colorMode"
        colorScheme="colors.brand.primary"
        onChange={toggleColorMode}
        title=""
        size={"lg"}
        cursor={"pointer"}
        aria-label="Toggle color mode"
      >
        <AbsoluteCenter>
          {colorMode === "light" ? (
            <MoonIcon
              position={"relative"}
              // boxSize={4}
              left={-4}
              // ml={-6}
              userSelect={"none"}
            />
          ) : (
            <SunIcon position={"relative"} right={-2} userSelect={"none"} />
          )}
        </AbsoluteCenter>
      </Switch>
    </FormControl>
  );
}
