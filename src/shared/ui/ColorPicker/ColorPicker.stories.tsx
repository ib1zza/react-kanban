import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
import ColorPicker from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
    title: 'shared/ColorPicker',
    component: ColorPicker,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Primary: Story = {
    args: {

    },
};
export const PrimaryDark: Story = {
    args: {

    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
