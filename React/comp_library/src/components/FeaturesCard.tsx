import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  As,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export type FCardProps = [
  heading: string,
  description: string,
  icon: undefined | As,
  features: string[],
  img: string,
  cta: string
];

export const FeaturesCard = ({
  heading,
  description,
  icon,
  features,
  image,
  cta,
}: {
  heading: FCardProps[0];
  description: FCardProps[1];
  icon: FCardProps[2];
  features: FCardProps[3];
  image: FCardProps[4];
  cta: FCardProps[5];
}) => {
  const color_gray = useColorModeValue("gray.100", "gray.700");
  const color_primary = useColorModeValue(
    "colors.brand.primary.100",
    "colors.brand.primary.900",
  );
  const accordion_button_text = useColorModeValue(
    "colors.brand.secondary.900",
    "colors.brand.secondary.50",
  );
  const feature_gradient = useColorModeValue(
    "linear(colors.brand.primary.900,white 7em)",
    "linear(colors.brand.primary.200,black 7em)",
  );
  const feature_color_mode = useColorModeValue("screen", "multiply");
  return (
    <Box
      w={300}
      borderWidth="1px"
      borderRadius="md"
      borderColor={color_primary}
      overflow="hidden"
      p={5}
      alignItems={"center"}
      backgroundSize={"contain"}
      //[screen, lighten, hard-light, color-dodge, luminosity]
      backgroundBlendMode={feature_color_mode}
      bgGradient={`${feature_gradient}, url(${image})`}
    >
      <Stack align={"center"} spacing={4}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          rounded={"full"}
          bg={color_gray}
        >
          <Icon as={icon} boxSize={10} />
        </Flex>
        <Heading as={"h2"} size="md" textAlign={"center"} h={10}>
          {heading}
        </Heading>
        <Box>
          <Text
            mt={1}
            fontSize={"sm"}
            textAlign={"left"}
            alignContent={"center"}
            pb={3}
            h={{ base: 200 }}
          >
            {description}
          </Text>
          <Accordion allowMultiple defaultIndex={[0,1,2]}>
            <AccordionItem >
              <AccordionButton
                justifyContent={"space-between"}
                color={accordion_button_text}
                bg={color_gray}
              >
                <Heading pl={2} size="xs">
                  Offered Services:
                </Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={3} pr={0}>
                <UnorderedList>
                  {features.map((feature, i) => (
                    <ListItem key={i}>
                      <Heading as="h3" fontSize={12}>
                        {feature}
                      </Heading>
                    </ListItem>
                  ))}
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Link href={"/contact-us"} title="Contact TenK Solutions, LLC">
          <Button size={"sm"} mt={3} title="Contact TenK Solutions, LLC">
            {cta}
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};
