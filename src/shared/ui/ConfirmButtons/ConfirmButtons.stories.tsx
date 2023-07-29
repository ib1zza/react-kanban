import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
import ConfirmButtons from './ConfirmButtons';

const meta: Meta<typeof ConfirmButtons> = {
    title: 'shared/ConfirmButtons',
    component: ConfirmButtons,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof ConfirmButtons>;

export const Primary: Story = {
    args: {

    },
};
export const PrimaryDark: Story = {
    args: {

    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
