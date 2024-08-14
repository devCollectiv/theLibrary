// CaseStudy.stories.tsx
import { StoryFn } from '@storybook/react/*';
import React from 'react';
import CaseStudy from '../components/CaseStudy';

export default {
  title: 'Components/CaseStudy',
  component: CaseStudy,
}

const Template: StoryFn<typeof CaseStudy> = (args) => <CaseStudy {...args} />;

export const Default = Template.bind({});
Default.args = {
  sections: [
    {
      heading: 'Section 1',
      content: 'This is the content for section 1.',
    },
    {
      heading: 'Section 2',
      content: 'This is the content for section 2.',
    },
  ],
};
