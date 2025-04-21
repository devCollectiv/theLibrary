import { Box, Text } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import PulsatingCircle, { PulsatingCircleProps } from '../../components/PulsatingCircle';

export default {
  title: 'Kustom/components/PulsatingCircle',
  component: PulsatingCircle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 50, max: 300, step: 10 },
    },
    color: {
      control: 'color',
    },
    secondaryColor: {
      control: 'color',
    },
    pulseDuration: {
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
    },
    maxScale: {
      control: { type: 'range', min: 1.1, max: 3, step: 0.1 },
    },
    pulseCount: {
      control: { type: 'range', min: 1, max: 5, step: 1 },
    },
    glow: {
      control: 'boolean',
    },
    glowIntensity: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
    },
  },
} as Meta;

const Template: StoryFn<PulsatingCircleProps> = (args) => (
  <Box p={8} borderRadius="md" boxShadow="md" bg="gray.50">
    <PulsatingCircle {...args} />
  </Box>
);

const WithContentTemplate: StoryFn<PulsatingCircleProps> = (args) => (
  <Box p={8} borderRadius="md" boxShadow="md" bg="gray.50">
    <PulsatingCircle {...args}>
      <Text color="white" fontWeight="bold" fontSize="xl">
        Click
      </Text>
    </PulsatingCircle>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  size: 100,
  color: '#3182CE',
  pulseDuration: 2,
  maxScale: 1.5,
  pulseCount: 3,
  glow: true,
  glowIntensity: 0.5,
};

export const WithContent = WithContentTemplate.bind({});
WithContent.args = {
  size: 120,
  color: '#3182CE',
  pulseDuration: 2,
  maxScale: 1.5,
  pulseCount: 3,
  glow: true,
  glowIntensity: 0.5,
};

export const Energetic = Template.bind({});
Energetic.args = {
  size: 80,
  color: '#E53E3E',
  secondaryColor: '#FEB2B2',
  pulseDuration: 1,
  maxScale: 2,
  pulseCount: 4,
  glow: true,
  glowIntensity: 0.7,
};

export const Subtle = Template.bind({});
Subtle.args = {
  size: 150,
  color: '#805AD5',
  secondaryColor: '#D6BCFA',
  pulseDuration: 3,
  maxScale: 1.3,
  pulseCount: 2,
  glow: true,
  glowIntensity: 0.3,
};
