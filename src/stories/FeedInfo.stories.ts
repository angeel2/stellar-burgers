import { FeedInfoUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/FeedInfo',
  component: FeedInfoUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof FeedInfoUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFeedInfo: Story = {
  args: {
    feed: {
      total: 12543, 
      totalToday: 138 
    },
    readyOrders: [12345, 12346, 12347, 12348, 12349],
    pendingOrders: [12350, 12351, 12352]
  }
};
