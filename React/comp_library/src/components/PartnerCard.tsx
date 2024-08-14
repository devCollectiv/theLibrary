import { Box, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const PartnerCard = ({
  name,
  logo,
  website,
}: {
  name?: string;
  logo: string;
  website: string;
}) => {
  const bgColor = useColorModeValue("white", "#1A202C");
  const blendMode = useColorModeValue("luminosity", "exclusion");
  return (
    <Link
      href={website}
      isExternal
      _hover={{ textDecoration: "none" }}
      title={website}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        p={4}
        borderRadius="md"
      >
        {/* <Image src={logo} alt={`${name} Logo`} maxH="80px" mb={4} backgroundColor="black"/> */}
        <Box
          backgroundImage={logo}
          borderRadius={"md"}
          w={{ base: "150px", md: "200px" }}
          h={{ base: "50px", md: "80px" }}
          role="img"
          aria-roledescription={name}
          aria-label={name}
          transition="all 0.3s"
          _hover={{
            transform: "scale(1.05)",
            bgColor: "whiteAlpha.300",
            mixBlendMode: "normal",
          }}
          mixBlendMode={blendMode}
          backgroundColor={bgColor}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
          opacity={0.6}
          // border={"1px solid red"}
          boxShadow={"2xl"}
        />
      </Flex>
    </Link>
  );
};
