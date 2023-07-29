import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '../../../../app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from '../../../../shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '../../../../shared/config/Storybook/StoreDecorator/StoreDecorator';
import ShareBoard from './ShareBoard';

const meta: Meta<typeof ShareBoard> = {
    title: 'features/ShareBoard',
    component: ShareBoard,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator()];
export default meta;
type Story = StoryObj<typeof ShareBoard>;
export const Primary: Story = {
    args: {
        board: {
            uid: '',
            columns: {},
            guestPermissions: [],
            guestsAllowed: [],
            ownerId: '',
            title: '',
            usersAllowed: [],
            timeCreated: '',
            timeUpdated: '',
        },
    },
};
export const PrimaryDark: Story = {
    args: {

        board: {
            uid: '',
            columns: {},
            guestPermissions: [],
            guestsAllowed: [],
            ownerId: '',
            title: '',
            usersAllowed: [],
            timeCreated: '',
            timeUpdated: '',
        },

    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
