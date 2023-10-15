import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
import Modal from './Modal';
import ColorPicker from '../ColorPicker/ColorPicker';

const meta: Meta<typeof Modal> = {
    title: 'shared/Modal',
    component: Modal,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
    args: {
        title: 'ColorPicker',
        children: <ColorPicker
            color=""
            onChange={() => null}
        />,
    },
};
export const PrimaryDark: Story = {
    args: {
        title: 'ColorPicker',
        children: <ColorPicker
            color=""
            onChange={() => null}
        />,
    },

};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
