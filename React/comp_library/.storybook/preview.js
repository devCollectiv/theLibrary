/** @type { import('@storybook/react').Preview } */

// const theme = require('../pathToThem')

const preview = {
  parameters: {
    // chakra: {
    //   theme,
    // },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
