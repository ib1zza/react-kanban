import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';
import { Theme } from '../../../../app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from '../../../../shared/config/Storybook/ThemeDecorator/ThemeDecorator';

const meta: Meta<typeof LoginForm> = {
    title: 'features/LoginForm',
    component: LoginForm,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof LoginForm>;
export const Primary: Story = {
    args: {

    },
};
export const PrimaryDark: Story = {
    args: {

    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
