import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import ActionFormCreateColumn from './ActionFormCreateColumn';

const meta: Meta<typeof ActionFormCreateColumn> = {
    title: 'shared/ActionForm',
    component: ActionFormCreateColumn,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof ActionFormCreateColumn>;

export const Column: Story = {
};

export const ColumnDark: Story = {
};
ColumnDark.decorators = [ThemeDecorator(Theme.DARK)];
