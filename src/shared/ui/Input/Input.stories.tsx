import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { Input, InputTheme } from './Input';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
// export default {
//     title: 'shared/Input',
//     component: Input,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as ComponentMeta<typeof Input>;

// const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

// export const Primary = Template.bind({});
// Primary.args = {
//     placeholder: 'Type text',
//     value: '123123',
// };

const meta: Meta<typeof Input> = {
    title: 'shared/Input',
    component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const FirstStory: Story = {
    args: {
        value: '123123',
    },
};
FirstStory.decorators = [ThemeDecorator(Theme.DARK)];
