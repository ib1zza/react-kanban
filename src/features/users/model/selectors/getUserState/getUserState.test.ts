import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUserState } from './getUserState';

describe('getUserState', () => {
    test('should return user', () => {
        const state: DeepPartial<StateSchema> = {
            userInfo: {
                user: {
                    boardInvitedIds: [
                        'hello',
                        'f510e048-8818-431d-8318-027a45ba7855',
                        '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                    ],
                    email: 'ib1zza@gmail.com',
                    photoURL: 'h',
                    boardsIds: [
                        'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                    ],
                    uid: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                    displayName: 'ya_russkiy',
                    select: 'study',
                },
            },
        };

        expect(getUserState(state as StateSchema)).toEqual({
            user: {
                boardInvitedIds: [
                    'hello',
                    'f510e048-8818-431d-8318-027a45ba7855',
                    '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                ],
                email: 'ib1zza@gmail.com',
                photoURL: 'h',
                boardsIds: [
                    'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                ],
                uid: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                displayName: 'ya_russkiy',
                select: 'study',
            },

        });
    });
});
