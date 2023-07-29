import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from '../../../shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import Task from './Task';

const meta: Meta<typeof Task> = {
    title: 'entities/Task',
    component: Task,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof Notification>;
export const Primary: Story = {
    args: {
        //  @ts-ignore
        task: {
            uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
            title: '1e21e22e',
            description: '12e',
            timeCreated: '1688447632336',
            isCompleted: true,
            tags: [''],
            creatorId: '',
            subtasks: {},
        },
        boardId: '',
        columnId: 'string',
    },
};
export const PrimaryDark: Story = {
    args: {
        //  @ts-ignore
        task: {
            uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
            title: '1e21e22e',
            description: '12e',
            timeCreated: '1688447632336',
            isCompleted: true,
            tags: [''],
            creatorId: '',
            subtasks: {},
        },
        boardId: '',
        columnId: 'string',
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
