import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import FormToCreate, { ActionFormStatus } from './ActionForm';

const meta: Meta<typeof FormToCreate> = {
    title: 'shared/FormToCreate',
    component: FormToCreate,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof FormToCreate>;

export const Board: Story = {
    args: {
        status: ActionFormStatus.BOARD,
    },
};

export const BoardDark: Story = {
    args: {
        status: ActionFormStatus.BOARD,
    },
};
BoardDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Column: Story = {
    args: {
        status: ActionFormStatus.COLUMN,
    },
};

export const ColumnDark: Story = {
    args: {
        status: ActionFormStatus.COLUMN,
    },
};
ColumnDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Edit: Story = {
    args: {
        status: ActionFormStatus.EDIT,
    },
};

export const EditDark: Story = {
    args: {
        status: ActionFormStatus.EDIT,
    },
};
EditDark.decorators = [ThemeDecorator(Theme.DARK)];
export const Link: Story = {
    args: {
        status: ActionFormStatus.LINK,
    },
};

export const LinkDark: Story = {
    args: {
        status: ActionFormStatus.LINK,
    },
};
LinkDark.decorators = [ThemeDecorator(Theme.DARK)];
