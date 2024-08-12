/** @type { import('@storybook/react').Preview } */
import { theme } from "@chakra-ui/react";

const preview = {
  parameters: {
    chakra: {
      theme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
