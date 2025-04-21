import { Box } from '@chakra-ui/react';
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
      control: { type: 'range', min: 16, max: 128, step: 8 },
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
  barCount: 64,
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
  barCount: 96,
};

export const CircularVisualizer = Template.bind({});
CircularVisualizer.args = {
  ...BarVisualizer.args,
  visualizationType: 'circular',
  color: '#D53F8C',
  secondaryColor: '#9F7AEA',
  height: 300,
  barCount: 128,
  glow: true,
};

export const ParticleVisualizer = Template.bind({});
ParticleVisualizer.args = {
  ...BarVisualizer.args,
  visualizationType: 'particles',
  color: '#DD6B20',
  secondaryColor: '#3182CE',
  height: 300,
  barCount: 48,
  simulationFrequency: 0.03,
  glow: true,
};
