import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import ImageWIthGradientBacker, {
  ImageWithGradientBackerProps,
} from "../components/ImageWithGradientBack";

export default {
  title: "Custom/RoundedImageWithGradient",
  component: ImageWIthGradientBacker,
} as Meta;

const Template: StoryFn<ImageWithGradientBackerProps> = (args) => (
  <ImageWIthGradientBacker {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imageUrl: "https://picsum.photos/200/300?grayscale",
  gradientColor1: "#ff0000",
  gradientColor2: "#0000ff",
  cornerRadius: 16,
  imageHeight: 300,
  aspectRatio: 0.8,
  rotateAngle: 10,
};

export const LargeRadius = Template.bind({});
LargeRadius.args = {
  ...Default.args,
  cornerRadius: 32,
};

export const DifferentGradient = Template.bind({});
DifferentGradient.args = {
  ...Default.args,
  gradientColor1: "#00aa00",
  gradientColor2: "#ff9900",
};

export const DifferentAngle = Template.bind({});
DifferentAngle.args = {
  ...Default.args,
  rotateAngle: -8,
};
