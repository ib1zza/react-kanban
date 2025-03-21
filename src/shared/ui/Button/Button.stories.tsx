import type { Meta, StoryObj } from '@storybook/react';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from '../../config/Storybook/ThemeDecorator/ThemeDecorator';
import Button, { ButtonSize, ButtonTheme } from './Button';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryS: Story = {
    args: {
        children: 'Button',
        size: ButtonSize.S,
    },
};
export const PrimaryM: Story = {
    args: {
        children: 'Button',
        size: ButtonSize.M,
    },
};
export const PrimaryL: Story = {
    args: {
        children: 'Button',
        size: ButtonSize.L,
    },
};
export const PrimaryDark: Story = {
    args: {
        children: 'Button',
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Icon: Story = {
    args: {
        icon: faCircleCheck,

    },
};
export const IconWithText: Story = {
    args: {
        icon: faCircleCheck,
        children: 'Button',
    },
};
export const Loading: Story = {
    args: {
        loading: true,
        children: 'Button',
    },
};
export const LoadingDark: Story = {
    args: {
        loading: true,
        children: 'Button',
    },
};
LoadingDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear: Story = {
    args: {
        children: 'Button',
        theme: ButtonTheme.CLEAR,
    },
};
