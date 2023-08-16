import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUnreadNotificationsCount } from './getUnreadNotificationsCount';

describe('getUnreadNotificationsCount', () => {
    test('', () => {
        const state: DeepPartial<StateSchema> = {
            notifications: {
                notifications: [
                    {
                        uid: '1',
                        read: false,
                        timestamp: 1,
                    },
                    {
                        uid: '2',
                        read: false,
                        timestamp: 2,
                    },
                    {
                        uid: '3',
                        read: true,
                        timestamp: 3,
                    },
                ],
            },
        };
        expect(getUnreadNotificationsCount(state as StateSchema)).toEqual(2);
    });
});
