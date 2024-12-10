import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from '../../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { Avatar, AvatarSize } from './Avatar';

Avatar;

const meta: Meta<typeof Avatar> = {
    title: 'shared/Avatar',
    component: Avatar,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof Avatar>;

export const PrimaryS: Story = {
    args: {
        src: 'https://avatars.githubusercontent.com/u/80410813?v=4',
        size: AvatarSize.S,
    },
};
export const PrimaryM: Story = {
    args: {
        src: 'https://avatars.githubusercontent.com/u/73640364?v=4',
        size: AvatarSize.M,
    },
};
export const PrimaryL: Story = {
    args: {
        src: 'https://avatars.githubusercontent.com/u/73640364?v=4',
        size: AvatarSize.L,
    },
};
export const WithAltText: Story = {
    args: {
        alt: 'Avatar',
    },
};

export const WithAltTextDark: Story = {
    args: {
        alt: 'Avatar',
    },
};

WithAltTextDark.decorators = [ThemeDecorator(Theme.DARK)];
