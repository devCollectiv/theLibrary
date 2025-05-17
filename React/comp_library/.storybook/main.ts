import path from "node:path";
/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@chakra-ui/storybook-addon",

    // this or (works to show docs and code in add-on, but doesnt show inner component, just component)
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     sourceLoaderOptions: {
    //       injectStoryParameters: false,
    //     },
    //   },
    // },
    // "@storybook/addon-storysource",
    // or this w/out addon-docs
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          include: [path.resolve(__dirname, "../src/components")], // You can specify directories
        },
        sourceLoaderOptions: {
          parser: 'typescript',
          prettierConfig: { printWidth: 80, singleQuote: true },
          injectStoryParameters: false, //works to show code at bottom but not inner
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  // staticDirs: ["..\\public"],
  features: {
    emotionalAlias: false,
  },
};
export default config;
