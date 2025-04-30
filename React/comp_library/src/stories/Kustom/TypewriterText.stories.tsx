import { Box } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import TypewriterText, { TypewriterTextProps } from '../../components/TypewriterText';

export default {
  title: 'Kustom/components/TypewriterText',
  component: TypewriterText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      control: 'text',
    },
    textArray: {
      control: 'object',
    },
    typingSpeed: {
      control: { type: 'range', min: 10, max: 500, step: 10 },
    },
    deleteDelay: {
      control: { type: 'range', min: 500, max: 5000, step: 100 },
    },
    nextTextDelay: {
      control: { type: 'range', min: 100, max: 2000, step: 100 },
    },
    loop: {
      control: 'boolean',
    },
    fontSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'bold', 'extrabold'],
    },
    color: {
      control: 'color',
    },
    cursorColor: {
      control: 'color',
    },
    showCursor: {
      control: 'boolean',
    },
    cursorChar: {
      control: 'text',
    },
  },
} as Meta;

const Template: StoryFn<TypewriterTextProps> = (args) => (
  <Box p={8} borderRadius="md" boxShadow="md" bg="gray.50" minH="100px" display="flex" alignItems="center" justifyContent="center">
    <TypewriterText {...args} />
  </Box>
);

export const SingleText = Template.bind({});
SingleText.args = {
  textArray: ['Welcome to devCollectiv'],
  typingSpeed: 100,
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'black',
  cursorColor: 'black',
  showCursor: true,
  cursorChar: '|',
};

export const MultipleTexts = Template.bind({});
MultipleTexts.args = {
  textArray: [
    'Build amazing websites',
    'Create engaging experiences',
    'Develop innovative solutions',
    'Welcome to devCollectiv',
  ],
  typingSpeed: 80,
  deleteDelay: 1500,
  nextTextDelay: 500,
  loop: true,
  fontSize: '3xl',
  fontWeight: 'bold',
  color: '#3182CE',
  cursorColor: '#3182CE',
  showCursor: true,
  cursorChar: '_',
};

export const SlowTyping = Template.bind({});
SlowTyping.args = {
  textArray: [
    'Thoughtful design...',
    'Careful implementation...',
    'Beautiful results...',
  ],
  typingSpeed: 200,
  deleteDelay: 2000,
  nextTextDelay: 1000,
  loop: true,
  fontSize: 'xl',
  fontWeight: 'medium',
  color: '#805AD5',
  cursorColor: '#805AD5',
  showCursor: true,
  cursorChar: '▌',
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  textArray: [
    'MODERN',
    'SLEEK',
    'POWERFUL',
    'INNOVATIVE',
  ],
  typingSpeed: 150,
  deleteDelay: 1000,
  nextTextDelay: 300,
  loop: true,
  fontSize: '4xl',
  fontWeight: 'extrabold',
  color: '#E53E3E',
  cursorColor: '#E53E3E',
  showCursor: true,
  cursorChar: '█',
};
