import { Box, Fade, Heading, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);

type SectionType = {
  heading: string;
  content: string;}

const CaseStudy = ({ sections }: { sections: SectionType[] }) => {
  return (
    <Box
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src={"https://picsum.photos/600/200"}
        alt="Illustration"
        width="600px"
        mb={10}
      />

      {sections.map((section, index) => (
        <Fade key={index} in>
          <Box maxW="600px" p={6} bgColor="white" shadow="lg" mb={6}>
            <MotionHeading
              mb={4}
              fontSize="xl"
              textAlign="center"
              whileHover={{ y: -5 }}
            >
              {section.heading}
            </MotionHeading>
            <MotionText
              fontSize="md"
              textAlign="justify"
              whileHover={{ y: -3 }}
            >
              {section.content}
            </MotionText>
          </Box>
        </Fade>
      ))}
    </Box>
  );
};

export default CaseStudy;
