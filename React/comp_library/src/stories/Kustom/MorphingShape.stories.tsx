import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import MorphingShape, { MorphingShapeProps } from '../../components/MorphingShape';

export default {
  title: 'Kustom/components/MorphingShape',
  component: MorphingShape,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: {
      control: { type: 'range', min: 100, max: 500, step: 10 },
    },
    height: {
      control: { type: 'range', min: 100, max: 500, step: 10 },
    },
    paths: {
      control: 'object',
    },
    color: {
      control: 'color',
    },
    secondaryColor: {
      control: 'color',
    },
    morphDuration: {
      control: { type: 'range', min: 0.5, max: 10, step: 0.5 },
    },
    morphDelay: {
      control: { type: 'range', min: 0, max: 5, step: 0.5 },
    },
    loop: {
      control: 'boolean',
    },
    useGradient: {
      control: 'boolean',
    },
    glow: {
      control: 'boolean',
    },
    glowIntensity: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
    },
    rotate: {
      control: 'boolean',
    },
    rotationSpeed: {
      control: { type: 'range', min: 1, max: 50, step: 1 },
    },
    pulse: {
      control: 'boolean',
    },
    morphOnHover: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: StoryFn<MorphingShapeProps> = (args) => (
  <Box p={4} borderRadius="md" boxShadow="md" bg="gray.50">
    <MorphingShape {...args} />
  </Box>
);

// Custom SVG paths for more complex shapes
const customPaths = [
  // Wave
  'M10,50 C20,40 40,60 50,50 C60,40 80,60 90,50',
  // Heart
  'M50,20 C55,10 70,10 75,20 C80,30 70,40 50,60 C30,40 20,30 25,20 C30,10 45,10 50,20 Z',
  // Cloud
  'M25,60 C10,60 10,40 25,40 C25,20 60,20 60,40 C80,40 80,60 60,60 Z',
  // Lightning bolt
  'M45,10 L25,50 L45,50 L30,90 L70,40 L50,40 L65,10 Z',
  // Droplet
  'M50,10 C70,30 90,60 50,90 C10,60 30,30 50,10 Z',
];

export const Default = Template.bind({});
Default.args = {
  width: 200,
  height: 200,
  color: '#3182CE',
  secondaryColor: '#805AD5',
  morphDuration: 2,
  morphDelay: 1,
  loop: true,
  useGradient: true,
  glow: false,
  glowIntensity: 0.5,
  rotate: false,
  rotationSpeed: 10,
  pulse: false,
  morphOnHover: false,
};

export const CustomShapes = Template.bind({});
CustomShapes.args = {
  ...Default.args,
  paths: customPaths,
  color: '#DD6B20',
  secondaryColor: '#D53F8C',
};

export const GlowingRotation = Template.bind({});
GlowingRotation.args = {
  ...Default.args,
  color: '#38A169',
  secondaryColor: '#D69E2E',
  glow: true,
  glowIntensity: 0.7,
  rotate: true,
  rotationSpeed: 15,
};

export const PulsingInteractive = Template.bind({});
PulsingInteractive.args = {
  ...Default.args,
  color: '#D53F8C',
  secondaryColor: '#9F7AEA',
  morphDuration: 1,
  pulse: true,
  morphOnHover: true,
};
