import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';

import { StoreDecorator } from '../../config/Storybook/StoreDecorator/StoreDecorator';
import Modal from './Modal';
import ColorPicker from '../ColorPicker/ColorPicker';

const meta: Meta<typeof Modal> = {
    title: 'shared/Modal',
    component: Modal,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator()];
export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
    args: {
        children: <ColorPicker
            color=""
            onChange={() => null}
        />,
    },
};
export const PrimaryDark: Story = {
    args: {
        children: <ColorPicker
            color=""
            onChange={() => null}
        />,
    },

};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
