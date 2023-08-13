import { DeepPartial } from '@reduxjs/toolkit';
import { getNotifications } from './getNotifications';
import { StateSchema } from '../../../../../app/providers/StoreProvider';

describe('getNotifications', () => {
    test('should return notifications', () => {
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
                        read: true,
                        timestamp: 2,
                    },
                ],
            },
        };
        expect(getNotifications(state as StateSchema)).toEqual([
            {
                uid: '1',
                read: false,
                timestamp: 1,
            },
            {
                uid: '2',
                read: true,
                timestamp: 2,
            },
        ]);
    });
});
