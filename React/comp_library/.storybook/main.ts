import path from "node:path";

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-links",
    "@storybook/addon-storysource",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    '@chakra-ui/storybook-addon',
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          include: [path.resolve(__dirname, '../src/components/')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 100, singleQuote: false },
          injectStoryParameters: false,
        },
      }
    }
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  // staticDirs: ["..\\public"],
  features: {
    emotionalAlias: false
  }
};
export default config;
