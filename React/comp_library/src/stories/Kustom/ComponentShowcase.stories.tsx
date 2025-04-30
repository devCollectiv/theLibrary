import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

// Import all components
import FloatingBubbles from '../../components/FloatingBubbles';
import PulsatingCircle from '../../components/PulsatingCircle';
import TypewriterText from '../../components/TypewriterText';
import ParticleInteraction from '../../components/ParticleInteraction';
import MorphingShape from '../../components/MorphingShape';
import AudioVisualizer from '../../components/AudioVisualizer';

export default {
  title: 'Kustom/ComponentShowcase',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: StoryFn = () => (
  <Box p={8} bg="gray.50" minH="100vh">
    <VStack spacing={12} align="stretch">
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Kustom Component Showcase
      </Heading>
      
      <Box>
        <Heading as="h2" size="lg" mb={4}>
          FloatingBubbles
        </Heading>
        <Flex justifyContent="center">
          <FloatingBubbles 
            width={300} 
            height={200} 
            bubbleCount={20} 
            colors={['#FF5733', '#33FF57', '#3357FF']}
          />
        </Flex>
      </Box>
      
      <Box>
        <Heading as="h2" size="lg" mb={4}>
          PulsatingCircle
        </Heading>
        <Flex justifyContent="center">
          <PulsatingCircle 
            size={120} 
            color="#3182CE" 
            pulseCount={3} 
            glow={true}
          >
            <Box color="white" fontWeight="bold">Click</Box>
          </PulsatingCircle>
        </Flex>
      </Box>
      
      <Box>
        <Heading as="h2" size="lg" mb={4}>
          TypewriterText
        </Heading>
        <Flex justifyContent="center">
          <TypewriterText 
            textArray={[
              "Welcome to Kustom Components",
              "Interactive UI Elements",
              "For Modern Web Applications"
            ]}
            typingSpeed={80}
            fontSize="2xl"
            color="#805AD5"
          />
        </Flex>
      </Box>
      
      <Box>
        <Heading as="h2" size="lg" mb={4}>
          ParticleInteraction
        </Heading>
        <Flex justifyContent="center">
          <ParticleInteraction 
            width={500}
            height={200}
            particleCount={50}
            interactionType="attract"
            baseColor="#38A169"
            accentColor="#DD6B20"
          />
        </Flex>
      </Box>
      
      <Box>
        <Heading as="h2" size="lg" mb={4}>
          MorphingShape
        </Heading>
        <Flex justifyContent="center">
          <MorphingShape 
            width={200}
            height={200}
            color="#D53F8C"
            secondaryColor="#9F7AEA"
            glow={true}
            rotate={true}
          />
        </Flex>
      </Box>
      
      <Box>
        <Heading as="h2" size="lg" mb={4}>
          AudioVisualizer
        </Heading>
        <Flex justifyContent="center">
          <AudioVisualizer 
            width={500}
            height={200}
            visualizationType="bars"
            color="#DD6B20"
            secondaryColor="#3182CE"
            simulateAudio={true}
            showControls={true}
          />
        </Flex>
      </Box>
    </VStack>
  </Box>
);

export const AllComponents = Template.bind({});
