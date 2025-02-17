import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import EditTaskForm from '.';

const meta: Meta<typeof EditTaskForm> = {
    title: 'entities/EditTaskForm',
    component: EditTaskForm,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof EditTaskForm>;
export const Primary: Story = {
    args: {
        prevTask: {
            uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
            title: '1e21e22e',
            description: '12e',
            timeCreated: '1688447632336',
            isCompleted: true,
            tags: [''],
            creatorId: '',
            displayId: 1,
        },
    },
};
export const PrimaryDark: Story = {
    args: {
        prevTask: {
            uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
            title: '1e21e22e',
            description: '12e',
            timeCreated: '1688447632336',
            isCompleted: true,
            tags: [''],
            creatorId: '',
            displayId: 1,
        },
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
