
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { FaChartLine, FaLaptopCode, FaRocket } from 'react-icons/fa';
import { FeaturesCard } from '../components/FeaturesCard';

export default {
  title: 'Components/FeaturesCard',
  component: FeaturesCard,
  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof FeaturesCard> = (args) => <FeaturesCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  heading: 'Web Development',
  description: 'We build modern, responsive, and user-friendly websites using the latest technologies.',
  icon: FaLaptopCode,
  features: ['React', 'Angular', 'Vue', 'Node.js', 'Express'],
  image: 'https://picsum.photos/300/200',
  cta: 'Get a Quote',
};

export const Analytics = Template.bind({});
Analytics.args = {
  heading: 'Data Analytics',
  description: 'We help businesses make data-driven decisions by analyzing and visualizing their data.',
  icon: FaChartLine,
  features: ['Python', 'R', 'SQL', 'Tableau', 'Power BI'],
  image: 'https://picsum.photos/300/200',
  cta: 'Learn More',
};

export const DevOps = Template.bind({});
DevOps.args = {
  heading: 'DevOps Solutions',
  description: 'We streamline software development and deployment processes with our DevOps expertise.',
  icon: FaRocket,
  features: ['CI/CD', 'Containerization', 'Kubernetes', 'Monitoring', 'Automation'],
  image: 'https://picsum.photos/300/200',
  cta: 'Get Started',
};
