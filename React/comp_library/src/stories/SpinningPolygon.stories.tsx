import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import SpinningPolygon, { SpinningPolygonProps } from '../components/SpinningPolygon';

export default {
  title: 'components/SpinningPolygon',
  component: SpinningPolygon,
  argTypes: {
    polygonSides: {
      control: { type: 'range', min: 3, max: 10, step: 1 },
    },
    // color: { control: 'color' },
    size: { control: { type: 'range', min: 50, max: 300, step: 10 } },
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<SpinningPolygonProps> = (args) => (
  <Box height="200vh" position="relative">
    <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
      <SpinningPolygon {...args} />
    </Box>
  </Box>
);

export const Solid = Template.bind({});
Solid.args = {
  polygonSides: 6,
  color: '#ff0000',
  size: 200,
};

export const Gradient = Template.bind({});
Gradient.args = {
  polygonSides: 8,
  color: ['#ff0000', '#00ff00', '#0000ff'],
  size: 200,
};