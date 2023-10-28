import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from 'shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { LinkedUserType } from 'app/types/IBoard';
import Notification from './Notification';
import { NotificationType } from '../model/types/NotificationsSchema';

const meta: Meta<typeof Notification> = {
    title: 'entities/Notification',
    component: Notification,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof Notification>;
export const Primary: Story = {
    args: {
        data: {
            isAccepted: false,
            uid: 'cbb12e67-0712-4215-a58c-56508ea5cd7c',
            timestamp: Date.now(),
            payload: {
                boardId: 'e7fd4a5b-4425-4f17-a79d-124d26fc14f9',
                userInvitedId: 'sqpfFsRXPVNNfzRooT3Ens8uaBA2',
                type: NotificationType.BOARD_INVITED,
                invitedRole: LinkedUserType.USER,
                isAccepted: true,
            },
            read: true,
        },
    },
};
export const PrimaryDark: Story = {
    args: {
        data: {
            isAccepted: false,
            uid: 'cbb12e67-0712-4215-a58c-56508ea5cd7c',
            timestamp: Date.now(),
            payload: {
                boardId: 'e7fd4a5b-4425-4f17-a79d-124d26fc14f9',
                userInvitedId: 'sqpfFsRXPVNNfzRooT3Ens8uaBA2',
                type: NotificationType.BOARD_INVITED,
                invitedRole: LinkedUserType.USER,
                isAccepted: true,
            },
            read: true,
        },
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
