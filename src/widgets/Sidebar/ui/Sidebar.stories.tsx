import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../../shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
import Sidebar from './Sidebar';
import { StoreDecorator } from '../../../shared/config/Storybook/StoreDecorator/StoreDecorator';

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
