import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator, StoreDecorator } from 'shared/config/Storybook';
import { Theme } from 'app/providers/theme';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
    title: 'widgets/Sidebar',
    component: Sidebar,
};

meta.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator()];
export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Primary: Story = {

};
export const PrimaryDark: Story = {

};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
