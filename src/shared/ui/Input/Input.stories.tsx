import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { Input, InputTheme } from './Input';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';

const meta: Meta<typeof Input> = {
    title: 'shared/Input',
    component: Input,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    args: {
        label: 'label',
        value: 'Text',
        theme: InputTheme.PRIMARY,
        placeholder: 'placeholder',
    },
};

export const Primary100px: Story = {
    args: {
        label: 'label',
        value: 'Text',
        theme: InputTheme.PRIMARY,
        placeholder: 'placeholder',
        width: '100px',
    },
};
export const PrimaryWithError: Story = {
    args: {
        error: 'error',
        label: 'label',
        value: 'Text',
        theme: InputTheme.CLEAR,
        placeholder: 'placeholder',
    },
};

export const PrimaryDark: Story = {
    args: {
        label: 'label',
        value: 'Text',
        theme: InputTheme.PRIMARY,
        placeholder: 'placeholder',
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export const Clear: Story = {
    args: {

        value: 'Text',
        theme: InputTheme.CLEAR,
        placeholder: 'placeholder',
    },
};
export const ClearDark: Story = {
    args: {

        value: 'Text',
        theme: InputTheme.CLEAR,
        placeholder: 'placeholder',
    },
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];
