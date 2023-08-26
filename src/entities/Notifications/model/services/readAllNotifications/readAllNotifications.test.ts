import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { readAllNotifications } from 'entities/Notifications/model/services/readAllNotifications/readAllNotifications';
import * as moduleApi from '../API/readNotificationQuery';

import { readNotificationQuery } from '../API/readNotificationQuery';

jest.mock('../API/readNotificationQuery', () => ({
    readNotificationQuery: (userId: string) => Promise.resolve({}),
})); // Step 3.

// Step 1.
jest.mock('../API/readNotificationQuery', () => {
    const original = jest.requireActual('../API/readNotificationQuery'); // Step 2.
    return {
        ...original,
        readNotificationQuery: jest.fn(),
    };
});

jest.spyOn(moduleApi, 'readNotificationQuery').mockReturnValue(Promise.resolve());
describe('readNotifications', () => {
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn().mockReturnValue(
            {
                notifications: {
                    notifications: [
                        {
                            uid: 'c67af483-9b20-4836-8f1b-bcd63dabb641',
                            read: false,
                            isAccepted: false,
                            timestamp: 1692360867083,
                            payload: {
                                boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                                invitedRole: 'guest',
                                userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                                type: 'BOARD_INVITED',
                            },
                        },
                        {
                            uid: '845689c4-741f-46f3-888d-575013ec5b90',
                            timestamp: 1688748450153,
                            read: false,
                            payload: {
                                type: 'BOARD_INVITED',
                                invitedRole: 'guest',
                                userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                                boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                                isAccepted: true,
                            },
                        },
                        {
                            payload: {
                                userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                                type: 'BOARD_INVITED',
                                boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                                invitedRole: 'guest',
                                isAccepted: true,
                            },
                            uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
                            isAccepted: false,
                            read: true,
                            timestamp: 1689350619236,
                        },
                        {
                            payload: {
                                type: 'BOARD_INVITED',
                                invitedRole: 'guest',
                                boardId: 'f510e048-8818-431d-8318-027a45ba7855',
                                userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                                isAccepted: true,
                            },
                            isAccepted: false,
                            read: true,
                            timestamp: 1689339787186,
                            uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
                        },
                    ],

                },
            },
        );
    });

    test('read all notifications', async () => {
        const testUserId = '1';
        const action = readAllNotifications(testUserId);

        expect(moduleApi.readNotificationQuery).toHaveBeenCalledTimes(2);
    });
});
