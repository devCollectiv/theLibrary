import SpinningPolygon from "../components/SpinningPolygon";

export default {
  title: "Custom/SpinningPolygon",
  component: SpinningPolygon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    size: 200,
    polygonSides: 5,
    color: 'red',
  },
};

export const Default = {
    args: {
      polygonSides: 5,
    },
  };