import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '../../../../app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from '../../../../shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '../../../../shared/config/Storybook/StoreDecorator/StoreDecorator';
import { BoardPageHeader } from './BoardPageHeader';

const meta: Meta<typeof BoardPageHeader> = {
    title: 'features/BoardPageHeader',
    component: BoardPageHeader,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator()];
export default meta;
type Story = StoryObj<typeof BoardPageHeader>;
export const Primary: Story = {
    args: {
        board: {
            title: 'title',
            public: true,
            columns: [],
            uid: 'uid',
            timeUpdated: '0',
            timeCreated: '0',
            users: [],
            guestPermissions: [],
            ownerId: 'uid',
        },
    },
};
export const PrimaryDark: Story = {
    args: {
        board: {
            title: 'title',
            public: true,
            columns: [],
            uid: 'uid',
            timeUpdated: '0',
            timeCreated: '0',
            users: [],
            guestPermissions: [],
            ownerId: 'uid',
        },
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
