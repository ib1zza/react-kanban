import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/Storybook';
import { Theme } from 'app/providers/theme';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
    title: 'widgets/Header',
    component: Header,
};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {};
export const PrimaryDark: Story = {};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
