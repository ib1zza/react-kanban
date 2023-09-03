import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from '../../../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { OptionType, Select } from './Select';

const meta: Meta<typeof Select> = {
    title: 'shared/Select',
    component: Select,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof Select>;

export const withText: Story = {
    args: {
        options: [
            { text: 'hello', value: 1 },
            { text: 'world', value: 2 },
        ],
        label: 'with text',
        placeholder: 'placeholder',
    },
};

export const withTextAndHeading: Story = {
    args: {
        options: [
            { text: 'hello', heading: 'sample text ', value: 1 },
            { text: 'world', heading: 'sample text ', value: 2 },
        ],
        label: 'with text and heading',
        placeholder: 'placeholder',
    },
};

export const withTextAndHeadingAndAvatar: Story = {
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

export const withTextDark: Story = {
    args: {
        options: [
            { text: 'hello', value: 1 },
            { text: 'world', value: 2 },
        ],
        label: 'with text',
        placeholder: 'placeholder',
    },
};

withTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const withTextAndHeadingDark: Story = {
    args: {
        options: [
            { text: 'hello', heading: 'sample text ', value: 1 },
            { text: 'world', heading: 'sample text ', value: 2 },
        ],
        label: 'with text and heading',
        placeholder: 'placeholder',
    },
};

withTextAndHeadingDark.decorators = [ThemeDecorator(Theme.DARK)];

export const withTextAndHeadingAndAvatarDark: Story = {
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

withTextAndHeadingAndAvatarDark.decorators = [ThemeDecorator(Theme.DARK)];

// export const PrimaryDark: Story = {
//     args: {
//         label: 'label',
//         value: 'Text',
//         theme: InputTheme.PRIMARY,
//         placeholder: 'placeholder',
//     },
// };
// PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
// export const Clear: Story = {
//     args: {
//
//         value: 'Text',
//         theme: InputTheme.CLEAR,
//         placeholder: 'placeholder',
//     },
// };
// export const ClearDark: Story = {
//     args: {
//
//         value: 'Text',
//         theme: InputTheme.CLEAR,
//         placeholder: 'placeholder',
//     },
// };
// ClearDark.decorators = [ThemeDecorator(Theme.DARK)];
