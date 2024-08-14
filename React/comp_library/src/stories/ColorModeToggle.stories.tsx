import { ChakraProvider } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ColorModeToggle from '../components/ColorModeToggle';

export default {
  title: 'Components/ColorModeToggle',
  component: ColorModeToggle,
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <ColorModeToggle />;

export const Default = Template.bind({});
