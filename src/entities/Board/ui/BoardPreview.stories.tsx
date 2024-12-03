import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import BoardPreview from './BoardPreview';

const meta: Meta<typeof BoardPreview> = {
    title: 'entities/BoardPreview',
    component: BoardPreview,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof BoardPreview>;
export const Primary: Story = {
    args: {
        board: {
            uid: '123',
            ownerId: '123',
            title: 'title',
            timeCreated: '',
            timeUpdated: '',
        },
    },
};
export const PrimaryDark: Story = {
    args: {
        board: {
            uid: '123',
            ownerId: '123',
            title: 'title',
            timeCreated: '',
            timeUpdated: '',
        },
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
