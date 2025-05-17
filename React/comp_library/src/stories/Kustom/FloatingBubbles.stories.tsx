import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import FloatingBubbles, { FloatingBubblesProps } from '../../components/FloatingBubbles';

export default {
  title: 'Kustom/components/FloatingBubbles',
  component: FloatingBubbles,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    bubbleCount: {
      control: { type: 'range', min: 5, max: 50, step: 1 },
    },
    colors: {
      control: 'object',
    },
    width: {
      control: { type: 'range', min: 100, max: 800, step: 10 },
    },
    height: {
      control: { type: 'range', min: 100, max: 800, step: 10 },
    },
    minSize: {
      control: { type: 'range', min: 5, max: 30, step: 1 },
    },
    maxSize: {
      control: { type: 'range', min: 20, max: 100, step: 1 },
    },
    minDuration: {
      control: { type: 'range', min: 2, max: 15, step: 0.5 },
    },
    maxDuration: {
      control: { type: 'range', min: 5, max: 30, step: 0.5 },
    },
    opacity: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
    },
  },
} as Meta;

const Template: StoryFn<FloatingBubblesProps> = (args) => (
  <Box p={4} borderRadius="md" boxShadow="md" bg="gray.50">
    <FloatingBubbles {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  bubbleCount: 15,
  colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'],
  width: 300,
  height: 400,
  minSize: 10,
  maxSize: 50,
  minDuration: 8,
  maxDuration: 20,
  opacity: 0.7,
};

export const Underwater = Template.bind({});
Underwater.args = {
  bubbleCount: 25,
  colors: ['#88CCFF', '#66AAFF', '#AADDFF', '#CCFFFF'],
  width: 400,
  height: 500,
  minSize: 5,
  maxSize: 30,
  minDuration: 10,
  maxDuration: 25,
  opacity: 0.5,
};

export const Colorful = Template.bind({});
Colorful.args = {
  bubbleCount: 30,
  colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF3', '#FF9933'],
  width: 500,
  height: 400,
  minSize: 8,
  maxSize: 40,
  minDuration: 6,
  maxDuration: 18,
  opacity: 0.8,
};
