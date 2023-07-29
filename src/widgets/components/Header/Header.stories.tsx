import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../../shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
import Header from './Header';
import { StoreDecorator } from '../../../shared/config/Storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof Header> = {
    title: 'widgets/Header',
    component: Header,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator()];
export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {

};
export const PrimaryDark: Story = {

};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
