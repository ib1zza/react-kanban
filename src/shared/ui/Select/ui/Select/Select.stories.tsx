import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from 'shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
    title: 'shared/Select',
    component: Select,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof Select>;

export const WithText: Story = {
    args: {
        options: [
            { text: 'hello', value: 1 },
            { text: 'world', value: 2 },
        ],
        label: 'with text',
        placeholder: 'placeholder',
    },
};

export const WithTextAndHeading: Story = {
    args: {
        options: [
            { text: 'hello', heading: 'sample text ', value: 1 },
            { text: 'world', heading: 'sample text ', value: 2 },
        ],
        label: 'with text and heading',
        placeholder: 'placeholder',
    },
};

export const WithTextAndHeadingAndAvatar: Story = {
    args: {
        options: [
            {
                text: 'hello',
                heading: 'sample text ',
                withAvatar: true,
                image: 'https://avatars.githubusercontent.com/u/73640364?v=4',
                value: 1,
            },
            {
                text: 'world',
                heading: 'sample text ',
                withAvatar: true,
                image: 'https://avatars.githubusercontent.com/u/80410813?v=4',
                value: 2,
            },
        ],
        label: 'with text and heading and avatar',
        placeholder: 'placeholder',
    },
};

export const WithTextDark: Story = {
    args: {
        options: [
            { text: 'hello', value: 1 },
            { text: 'world', value: 2 },
        ],
        label: 'with text',
        placeholder: 'placeholder',
    },
};

WithTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithTextAndHeadingDark: Story = {
    args: {
        options: [
            { text: 'hello', heading: 'sample text ', value: 1 },
            { text: 'world', heading: 'sample text ', value: 2 },
        ],
        label: 'with text and heading',
        placeholder: 'placeholder',
    },
};

WithTextAndHeadingDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithTextAndHeadingAndAvatarDark: Story = {
    args: {
        options: [
            {
                text: 'hello',
                heading: 'sample text ',
                withAvatar: true,
                image: 'https://avatars.githubusercontent.com/u/73640364?v=4',
                value: 1,
            },
            {
                text: 'world',
                heading: 'sample text ',
                withAvatar: true,
                image: 'https://avatars.githubusercontent.com/u/80410813?v=4',
                value: 2,
            },
        ],
        label: 'with text and heading and avatar',
        placeholder: 'placeholder',
    },
};

WithTextAndHeadingAndAvatarDark.decorators = [ThemeDecorator(Theme.DARK)];
