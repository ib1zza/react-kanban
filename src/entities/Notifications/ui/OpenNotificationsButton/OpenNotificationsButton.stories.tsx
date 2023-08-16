import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import OpenNotificationsButton from './OpenNotificationsButton';

const meta: Meta<typeof OpenNotificationsButton> = {
    title: 'entities/OpenNotificationsButton',
    component: OpenNotificationsButton,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof OpenNotificationsButton>;
export const Primary: Story = {
    args: {
    },
};
export const PrimaryDark: Story = {
    args: {
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
