import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import AddTaskForm from './AddTaskForm';

const meta: Meta<typeof AddTaskForm> = {
    title: 'entities/AddTaskForm',
    component: AddTaskForm,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof AddTaskForm>;
export const Primary: Story = {
    args: {
    },
};
export const PrimaryDark: Story = {
    args: {
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
