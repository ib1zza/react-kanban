import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '../../../shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
import TaskColumn from './TaskColumn';

const meta: Meta<typeof TaskColumn> = {
    title: 'entities/TaskColumn',
    component: TaskColumn,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof TaskColumn>;
export const Primary: Story = {
    args: {
        column: {
            uid: '',
            title: 'title',
            tasks: {},
            timeCreated: '',
            timeUpdated: '',
            color: '#2e2e2e',
        },
    },
};
export const PrimaryDark: Story = {
    args: {
        column: {
            uid: '',
            title: 'title',
            tasks: {},
            timeCreated: '',
            timeUpdated: '',
            color: '#2e2e2e',
        },
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
