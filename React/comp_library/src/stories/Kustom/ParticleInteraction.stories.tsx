import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ParticleInteraction, { ParticleInteractionProps } from '../../components/ParticleInteraction';

export default {
  title: 'Kustom/components/ParticleInteraction',
  component: ParticleInteraction,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: {
      control: { type: 'range', min: 200, max: 1000, step: 10 },
    },
    height: {
      control: { type: 'range', min: 200, max: 800, step: 10 },
    },
    particleCount: {
      control: { type: 'range', min: 10, max: 200, step: 5 },
    },
    baseColor: {
      control: 'color',
    },
    accentColor: {
      control: 'color',
    },
    particleSize: {
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
    },
    maxSpeed: {
      control: { type: 'range', min: 0.1, max: 5, step: 0.1 },
    },
    interactionRadius: {
      control: { type: 'range', min: 50, max: 300, step: 10 },
    },
    interactionType: {
      control: 'select',
      options: ['attract', 'repel', 'swirl', 'connect'],
    },
    interactionStrength: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    connectParticles: {
      control: 'boolean',
    },
    connectionDistance: {
      control: { type: 'range', min: 50, max: 200, step: 10 },
    },
    trailEffect: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: StoryFn<ParticleInteractionProps> = (args) => (
  <Box p={4} borderRadius="md" boxShadow="md">
    <ParticleInteraction {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  width: 500,
  height: 300,
  particleCount: 80,
  baseColor: '#3182CE',
  accentColor: '#E53E3E',
  particleSize: 3,
  maxSpeed: 1,
  interactionRadius: 100,
  interactionType: 'attract',
  interactionStrength: 5,
  connectParticles: true,
  connectionDistance: 100,
  trailEffect: false,
};

export const Repulsion = Template.bind({});
Repulsion.args = {
  ...Default.args,
  interactionType: 'repel',
  baseColor: '#805AD5',
  accentColor: '#38B2AC',
  particleCount: 100,
  interactionStrength: 7,
};

export const Swirl = Template.bind({});
Swirl.args = {
  ...Default.args,
  interactionType: 'swirl',
  baseColor: '#38A169',
  accentColor: '#DD6B20',
  particleCount: 120,
  interactionStrength: 6,
  interactionRadius: 150,
};

export const CosmicTrail = Template.bind({});
CosmicTrail.args = {
  width: 600,
  height: 400,
  particleCount: 150,
  baseColor: '#9F7AEA',
  accentColor: '#F6AD55',
  particleSize: 2,
  maxSpeed: 0.5,
  interactionRadius: 120,
  interactionType: 'swirl',
  interactionStrength: 8,
  connectParticles: false,
  trailEffect: true,
};
