import { Box, Heading, VStack } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import AudioVisualizer, { AudioVisualizerProps } from '../../components/AudioVisualizer';

export default {
  title: 'Kustom/components/AudioVisualizer',
  component: AudioVisualizer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: {
      control: { type: 'range', min: 300, max: 800, step: 10 },
    },
    height: {
      control: { type: 'range', min: 100, max: 500, step: 10 },
    },
    visualizationType: {
      control: 'select',
      options: ['bars', 'wave', 'circular', 'particles'],
    },
    color: {
      control: 'color',
    },
    secondaryColor: {
      control: 'color',
    },
    useGradient: {
      control: 'boolean',
    },
    barCount: {
      control: { type: 'range', min: 5, max: 15, step: 1 },
    },
    simulateAudio: {
      control: 'boolean',
    },
    simulationFrequency: {
      control: { type: 'range', min: 0.01, max: 0.2, step: 0.01 },
    },
    simulationAmplitude: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.05 },
    },
    showControls: {
      control: 'boolean',
    },
    mirror: {
      control: 'boolean',
    },
    smooth: {
      control: 'boolean',
    },
    sensitivity: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.05 },
    },
    glow: {
      control: 'boolean',
    },
    audioSrc: {
      control: 'text',
    },
    loop: {
      control: 'boolean',
    },
    autoPlay: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: StoryFn<AudioVisualizerProps> = (args) => (
  <Box p={4} borderRadius="md" boxShadow="md" bg="gray.50">
    <AudioVisualizer {...args} />
  </Box>
);

export const BarVisualizer = Template.bind({});
BarVisualizer.args = {
  width: 500,
  height: 200,
  visualizationType: 'bars',
  color: '#3182CE',
  secondaryColor: '#805AD5',
  useGradient: true,
  barCount: 10,
  simulateAudio: true,
  simulationFrequency: 0.05,
  simulationAmplitude: 0.7,
  showControls: true,
  mirror: true,
  smooth: true,
  sensitivity: 0.8,
  glow: false,
};

export const WaveVisualizer = Template.bind({});
WaveVisualizer.args = {
  ...BarVisualizer.args,
  visualizationType: 'wave',
  color: '#38A169',
  secondaryColor: '#D69E2E',
  barCount: 12,
};

export const CircularVisualizer = Template.bind({});
CircularVisualizer.args = {
  ...BarVisualizer.args,
  visualizationType: 'circular',
  color: '#D53F8C',
  secondaryColor: '#9F7AEA',
  height: 300,
  barCount: 12,
  glow: true,
};

export const ParticleVisualizer = Template.bind({});
ParticleVisualizer.args = {
  ...BarVisualizer.args,
  visualizationType: 'particles',
  color: '#DD6B20',
  secondaryColor: '#3182CE',
  height: 300,
  barCount: 8,
  simulationFrequency: 0.03,
  glow: true,
};

export const AudioFileVisualizer = Template.bind({});
AudioFileVisualizer.args = {
  width: 500,
  height: 200,
  visualizationType: 'bars',
  color: '#E53E3E',
  secondaryColor: '#F6AD55',
  useGradient: true,
  barCount: 10,
  simulateAudio: false,
  showControls: true,
  mirror: true,
  smooth: true,
  sensitivity: 0.8,
  glow: true,
  audioSrc: process.env.PUBLIC_URL + '/audio/angry-siren.mp3',
  loop: true,
  autoPlay: true,
};

// Story that shows all visualizer types with the same audio file
const AllVisualizersTemplate: StoryFn<AudioVisualizerProps> = (args) => (
  <VStack spacing={8} align="stretch" p={4} borderRadius="md" boxShadow="md" bg="gray.50">
    <Heading as="h2" size="md" textAlign="center">
      Audio Visualizer Types with MP3 File
    </Heading>

    <Box>
      <Heading as="h3" size="sm" mb={2}>Bars Visualization</Heading>
      <AudioVisualizer
        {...args}
        visualizationType="bars"
        color="#E53E3E"
        secondaryColor="#F6AD55"
      />
    </Box>

    <Box>
      <Heading as="h3" size="sm" mb={2}>Wave Visualization</Heading>
      <AudioVisualizer
        {...args}
        visualizationType="wave"
        color="#38A169"
        secondaryColor="#D69E2E"
      />
    </Box>

    <Box>
      <Heading as="h3" size="sm" mb={2}>Circular Visualization</Heading>
      <AudioVisualizer
        {...args}
        visualizationType="circular"
        color="#D53F8C"
        secondaryColor="#9F7AEA"
      />
    </Box>

    <Box>
      <Heading as="h3" size="sm" mb={2}>Particles Visualization</Heading>
      <AudioVisualizer
        {...args}
        visualizationType="particles"
        color="#DD6B20"
        secondaryColor="#3182CE"
      />
    </Box>
  </VStack>
);

export const AllVisualizers = AllVisualizersTemplate.bind({});
AllVisualizers.args = {
  width: 500,
  height: 200,
  barCount: 10,
  simulateAudio: false,
  showControls: true,
  mirror: true,
  smooth: true,
  sensitivity: 0.8,
  glow: true,
  audioSrc: process.env.PUBLIC_URL + '/audio/angry-siren.mp3',
  loop: true,
  autoPlay: false,
};

