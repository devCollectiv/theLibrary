import {
  Box,
  Button,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";
function PriceWrapper({ children }: { children: ReactNode }) {
  const borderColorValue = useColorModeValue("gray.200", "gray.500");
  return (
    <Box
      minWidth={300}
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={"center"}
      borderColor={borderColorValue}
      borderRadius={"xl"}
      textAlign={'center'}
    >
      {children}
    </Box>
  );
}

export function PriceCard({
  isFeatured,
  title,
  // price,
  // period,
  items,
  cta,
}: {
  isFeatured: boolean | undefined;
  title: string;
  price?: number;
  period?: string;
  items:
    | { icon: IconType; item: string }[]
    | { item: string; icon: IconType }[];
  cta: string;
}): React.JSX.Element {
  const textBGColorValue = useColorModeValue("red.300", "red.700");
  const textColorValue = useColorModeValue("gray.900", "gray.300");
  const stackColorValue = useColorModeValue("gray.50", "gray.700");
  return (
    <PriceWrapper>
      <Box position="relative" 
        >
        {isFeatured && (
          <Box
            position="absolute"
            top="-16px"
            left="50%"
            style={{ transform: "translate(-50%)" }}
          >
            <Text
              textTransform="uppercase"
              bg={textBGColorValue}
              px={3}
              py={1}
              color={textColorValue}
              fontSize="sm"
              fontWeight="600"
              rounded="xl"
            >
              Most Popular
            </Text>
          </Box>
        )}
      </Box>
      <Box py={4} px={6}>
        <Text fontWeight="500" fontSize="2xl">
          {title}
        </Text>
        {/* <HStack justifyContent="center">
          <Text fontSize="x-small" fontWeight="600">
            starting at
          </Text>
          <Text fontSize="3xl" fontWeight="600">
            $
          </Text>
          <Text fontSize="5xl" fontWeight="900">
            {price}
          </Text>
          <Text fontSize="xl" color="gray.500">
            {period}
          </Text>
        </HStack> */}
      </Box>
      <VStack bg={stackColorValue} py={4} borderBottomRadius={"xl"}>
        <List spacing={3} textAlign="start" px={6}>
          {items.map(({ icon, item }, i) => (
            <ListItem key={i}>
              <ListIcon as={icon} color="colors.brand.accent.500" />
              <Text as={"span"}>{item}</Text>
            </ListItem>
          ))}
        </List>
        <Box w="80%" pt={7}>
          <Link href={"/contact-us"} title="Contact TenK Solutions">
            <Button w="full" title={`TenK Solutions + ${cta}`}>
              {cta}
            </Button>
          </Link>
        </Box>
      </VStack>
    </PriceWrapper>
  );
}
