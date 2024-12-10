import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from 'shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { LinkedUserType } from 'app/types/IBoardFromServer';
import { NotificationType } from '../model/types/NotificationsSchema';
import NotificationMessageInvited from './NotificationMessageInvited';

const meta: Meta<typeof NotificationMessageInvited> = {
    title: 'entities/NotificationMessageInvited',
    component: NotificationMessageInvited,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof NotificationMessageInvited>;
export const Primary: Story = {
    args: {
        data: {
            boardId: 'e7fd4a5b-4425-4f17-a79d-124d26fc14f9',
            userInvitedId: 'sqpfFsRXPVNNfzRooT3Ens8uaBA2',
            type: NotificationType.BOARD_INVITED,
            invitedRole: LinkedUserType.USER,
            isAccepted: true,
        },
    },
};
export const PrimaryDark: Story = {
    args: {
        data: {
            boardId: 'e7fd4a5b-4425-4f17-a79d-124d26fc14f9',
            userInvitedId: 'sqpfFsRXPVNNfzRooT3Ens8uaBA2',
            type: NotificationType.BOARD_INVITED,
            invitedRole: LinkedUserType.USER,
            isAccepted: true,
        },
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
