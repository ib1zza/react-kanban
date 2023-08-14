import { notificationReducer, notificationsActions } from './notificationSlice';
import { NotificationsSchema, NotificationType } from '../types/NotificationsSchema';

describe('notificationSlice', () => {
    // test('readAllNotifications action', () => {
    //     const state: NotificationsSchema = {
    //         isLoading: false,
    //         error: '',
    //         notifications: [
    //             {
    //                 uid: '845689c4-741f-46f3-888d-575013ec5b90',
    //                 payload: {
    //                     isAccepted: true,
    //                     invitedRole: 'GUEST',
    //                     type: NotificationType.BOARD_INVITED,
    //                     boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
    //                     userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
    //                 },
    //                 read: true,
    //                 timestamp: 1688748450153,
    //             },
    //             {
    //                 read: false,
    //                 timestamp: 1689350619236,
    //                 payload: {
    //                     invitedRole: 'GUEST',
    //                     isAccepted: true,
    //                     type: NotificationType.BOARD_INVITED,
    //                     userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
    //                     boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
    //                 },
    //                 uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
    //             },
    //             {
    //                 read: false,
    //                 timestamp: 1689339787186,
    //                 uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
    //                 payload: {
    //                     userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
    //                     type: NotificationType.BOARD_INVITED,
    //                     invitedRole: 'GUEST',
    //                     boardId: 'f510e048-8818-431d-8318-027a45ba7855',
    //                     isAccepted: true,
    //                 },
    //             },
    //
    //         ],
    //     };
    //     expect(
    //         notificationReducer(
    //             state as NotificationsSchema,
    //             notificationsActions.readAllNotifications(),
    //         ),
    //     )
    //         .toEqual(
    //             {
    //                 notifications: [
    //                     {
    //                         uid: '845689c4-741f-46f3-888d-575013ec5b90',
    //                         payload: {
    //                             isAccepted: true,
    //                             invitedRole: 'GUEST',
    //                             type: NotificationType.BOARD_INVITED,
    //                             boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
    //                             userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
    //                         },
    //                         read: true,
    //                         timestamp: 1688748450153,
    //                     },
    //                     {
    //                         read: true,
    //                         timestamp: 1689350619236,
    //                         payload: {
    //                             invitedRole: 'GUEST',
    //                             isAccepted: true,
    //                             type: NotificationType.BOARD_INVITED,
    //                             userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
    //                             boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
    //                         },
    //                         uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
    //                     },
    //                     {
    //                         read: true,
    //                         timestamp: 1689339787186,
    //                         uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
    //                         payload: {
    //                             userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
    //                             type: NotificationType.BOARD_INVITED,
    //                             invitedRole: 'GUEST',
    //                             boardId: 'f510e048-8818-431d-8318-027a45ba7855',
    //                             isAccepted: true,
    //                         },
    //                     },
    //
    //                 ],
    //             },
    //         );
    // });
    test('acceptNotification action', () => {
        const state: NotificationsSchema = {
            isLoading: false,
            error: '',
            notifications: [
                {
                    uid: '845689c4-741f-46f3-888d-575013ec5b90',
                    payload: {
                        isAccepted: false,
                        invitedRole: 'GUEST',
                        type: NotificationType.BOARD_INVITED,
                        boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                        userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                    },
                    read: true,
                    timestamp: 1688748450153,
                },
                {
                    read: true,
                    timestamp: 1689350619236,
                    payload: {
                        invitedRole: 'GUEST',
                        isAccepted: true,
                        type: NotificationType.BOARD_INVITED,
                        userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                        boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                    },
                    uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
                },
                {
                    read: true,
                    timestamp: 1689339787186,
                    uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
                    payload: {
                        userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                        type: NotificationType.BOARD_INVITED,
                        invitedRole: 'GUEST',
                        boardId: 'f510e048-8818-431d-8318-027a45ba7855',
                        isAccepted: true,
                    },
                },

            ],
        };

        expect(
            notificationReducer(
                state as NotificationsSchema,
                notificationsActions.acceptNotification('845689c4-741f-46f3-888d-575013ec5b90'),
            ),
        )
            .toEqual(
                {
                    isLoading: false,
                    error: '',
                    notifications: [
                        {
                            uid: '845689c4-741f-46f3-888d-575013ec5b90',
                            payload: {
                                isAccepted: true,
                                invitedRole: 'GUEST',
                                type: NotificationType.BOARD_INVITED,
                                boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                                userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                            },
                            read: true,
                            timestamp: 1688748450153,
                        },
                        {
                            read: true,
                            timestamp: 1689350619236,
                            payload: {
                                invitedRole: 'GUEST',
                                isAccepted: true,
                                type: NotificationType.BOARD_INVITED,
                                userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                                boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                            },
                            uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
                        },
                        {
                            read: true,
                            timestamp: 1689339787186,
                            uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
                            payload: {
                                userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                                type: NotificationType.BOARD_INVITED,
                                invitedRole: 'GUEST',
                                boardId: 'f510e048-8818-431d-8318-027a45ba7855',
                                isAccepted: true,
                            },
                        },

                    ],
                },
            );
    });
    // test('setNotifications action', () => {
    //     const state: NotificationsSchema = {
    //         notifications: [],
    //         isLoading: false,
    //         error: '',
    //     };
    //
    //     expect(
    //         notificationReducer(
    //             state as NotificationsSchema,
    //             notificationsActions.setNotifications(
    //                 [
    //                     {
    //                         uid: '845689c4-741f-46f3-888d-575013ec5b90',
    //                         payload: {
    //                             isAccepted: true,
    //                             invitedRole: 'GUEST',
    //                             type: NotificationType.BOARD_INVITED,
    //                             boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
    //                             userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
    //                         },
    //                         read: true,
    //                         timestamp: 1688748450153,
    //                     },
    //                     {
    //                         read: true,
    //                         timestamp: 1689350619236,
    //                         payload: {
    //                             invitedRole: 'GUEST',
    //                             isAccepted: true,
    //                             type: NotificationType.BOARD_INVITED,
    //                             userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
    //                             boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
    //                         },
    //                         uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
    //                     },
    //                     {
    //                         read: true,
    //                         timestamp: 1689339787186,
    //                         uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
    //                         payload: {
    //                             userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
    //                             type: NotificationType.BOARD_INVITED,
    //                             invitedRole: 'GUEST',
    //                             boardId: 'f510e048-8818-431d-8318-027a45ba7855',
    //                             isAccepted: true,
    //                         },
    //                     },
    //
    //                 ],
    //             ),
    //         ),
    //     )
    //         .toEqual(
    //             {
    //                 isLoading: false,
    //                 error: '',
    //                 notifications: [
    //                     {
    //                         read: true,
    //                         timestamp: 1689350619236,
    //                         payload: {
    //                             invitedRole: 'GUEST',
    //                             isAccepted: true,
    //                             type: NotificationType.BOARD_INVITED,
    //                             userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
    //                             boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
    //                         },
    //                         uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
    //                     },
    //
    //                     {
    //                         read: true,
    //                         timestamp: 1689339787186,
    //                         uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
    //                         payload: {
    //                             userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
    //                             type: NotificationType.BOARD_INVITED,
    //                             invitedRole: 'GUEST',
    //                             boardId: 'f510e048-8818-431d-8318-027a45ba7855',
    //                             isAccepted: true,
    //                         },
    //                     },
    //                     {
    //                         uid: '845689c4-741f-46f3-888d-575013ec5b90',
    //                         payload: {
    //                             isAccepted: true,
    //                             invitedRole: 'GUEST',
    //                             type: NotificationType.BOARD_INVITED,
    //                             boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
    //                             userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
    //                         },
    //                         read: true,
    //                         timestamp: 1688748450153,
    //                     },
    //
    //                 ],
    //             },
    //         );
    // });
    test('removeNotification action', () => {
        const state: NotificationsSchema = {
            isLoading: false,
            error: '',
            notifications: [
                {
                    uid: '845689c4-741f-46f3-888d-575013ec5b90',
                    payload: {
                        isAccepted: true,
                        invitedRole: 'GUEST',
                        type: NotificationType.BOARD_INVITED,
                        boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                        userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                    },
                    read: true,
                    timestamp: 1688748450153,
                },
                {
                    read: true,
                    timestamp: 1689350619236,
                    payload: {
                        invitedRole: 'GUEST',
                        isAccepted: true,
                        type: NotificationType.BOARD_INVITED,
                        userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                        boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                    },
                    uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
                },
                {
                    read: true,
                    timestamp: 1689339787186,
                    uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
                    payload: {
                        userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                        type: NotificationType.BOARD_INVITED,
                        invitedRole: 'GUEST',
                        boardId: 'f510e048-8818-431d-8318-027a45ba7855',
                        isAccepted: true,
                    },
                },

            ],
        };

        expect(
            notificationReducer(
                state as NotificationsSchema,
                notificationsActions.removeNotification(
                    '845689c4-741f-46f3-888d-575013ec5b90',
                ),
            ),
        )
            .toEqual(
                {
                    isLoading: false,
                    error: '',
                    notifications: [
                        {
                            read: true,
                            timestamp: 1689350619236,
                            payload: {
                                invitedRole: 'GUEST',
                                isAccepted: true,
                                type: NotificationType.BOARD_INVITED,
                                userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                                boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                            },
                            uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
                        },

                        {
                            read: true,
                            timestamp: 1689339787186,
                            uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
                            payload: {
                                userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                                type: NotificationType.BOARD_INVITED,
                                invitedRole: 'GUEST',
                                boardId: 'f510e048-8818-431d-8318-027a45ba7855',
                                isAccepted: true,
                            },
                        },
                    ],
                },
            );
    });
    test('should work with empty state', () => {
        expect(
            notificationReducer(
                undefined,
                notificationsActions.setNotifications(
                    [
                        {
                            uid: '845689c4-741f-46f3-888d-575013ec5b90',
                            payload: {
                                isAccepted: true,
                                invitedRole: 'GUEST',
                                type: NotificationType.BOARD_INVITED,
                                boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                                userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                            },
                            read: true,
                            timestamp: 1688748450153,
                        },
                        {
                            read: true,
                            timestamp: 1689350619236,
                            payload: {
                                invitedRole: 'GUEST',
                                isAccepted: true,
                                type: NotificationType.BOARD_INVITED,
                                userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                                boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                            },
                            uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
                        },
                        {
                            read: true,
                            timestamp: 1689339787186,
                            uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
                            payload: {
                                userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                                type: NotificationType.BOARD_INVITED,
                                invitedRole: 'GUEST',
                                boardId: 'f510e048-8818-431d-8318-027a45ba7855',
                                isAccepted: true,
                            },
                        },

                    ],
                ),
            ),
        )
            .toEqual(
                {
                    isLoading: false,
                    error: '',
                    notifications: [
                        {
                            read: true,
                            timestamp: 1689350619236,
                            payload: {
                                invitedRole: 'GUEST',
                                isAccepted: true,
                                type: NotificationType.BOARD_INVITED,
                                userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                                boardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                            },
                            uid: '9514cf5f-c326-4c01-a657-e6547fd7b8ca',
                        },

                        {
                            read: true,
                            timestamp: 1689339787186,
                            uid: '0f4af800-dc39-4710-a67b-00d6121a3a24',
                            payload: {
                                userInvitedId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                                type: NotificationType.BOARD_INVITED,
                                invitedRole: 'GUEST',
                                boardId: 'f510e048-8818-431d-8318-027a45ba7855',
                                isAccepted: true,
                            },
                        },
                        {
                            uid: '845689c4-741f-46f3-888d-575013ec5b90',
                            payload: {
                                isAccepted: true,
                                invitedRole: 'GUEST',
                                type: NotificationType.BOARD_INVITED,
                                boardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                                userInvitedId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                            },
                            read: true,
                            timestamp: 1688748450153,
                        },

                    ],
                },
            );
    });
});
