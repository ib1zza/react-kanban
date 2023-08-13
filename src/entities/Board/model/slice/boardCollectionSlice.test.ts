import { BoardCollectionSchema } from '../types/BoardCollectionSchema';
import { boardCollectionActions, boardCollectionReducer } from './boardCollectionSlice';
import { GuestPermission } from '../../../../app/types/IBoard';

describe('boardCollectionSlice', () => {
    test('setCurrentBoard action', () => {
        const state: BoardCollectionSchema = {
            selectedBoardId: '',
            selectedColumnId: '',
            selectedBoard: null,
            selectedTask: null,
        };
        expect(boardCollectionReducer(
state as BoardCollectionSchema,
boardCollectionActions.setCurrentBoard({
    usersAllowed: [],
    guestsAllowed: [
        'U70ULZazI9gQOgX8XFh2a3xxVZB3',
    ],
    ownerId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
    timeCreated: '1689350604534',
    guestPermissions: [
        GuestPermission.NONE,
    ],
    timeUpdated: '1689350604534',
    uid: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
    title: 'myboardshare',
    columns: {},
}),
        )).toEqual(
            {
                selectedBoardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                selectedColumnId: '',
                selectedBoard: {
                    usersAllowed: [],
                    guestsAllowed: [
                        'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                    ],
                    ownerId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                    timeCreated: '1689350604534',
                    guestPermissions: [
                        GuestPermission.NONE,
                    ],
                    timeUpdated: '1689350604534',
                    uid: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                    title: 'myboardshare',
                    columns: {},
                },
                selectedTask: null,
            },
        );
    });

    test('removeSelectedBoard action', () => {
        const state: BoardCollectionSchema = {
            selectedBoardId: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
            selectedColumnId: '',
            selectedBoard: {
                usersAllowed: [],
                guestsAllowed: [
                    'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                ],
                ownerId: 'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                timeCreated: '1689350604534',
                guestPermissions: [
                    GuestPermission.NONE,
                ],
                timeUpdated: '1689350604534',
                uid: '6009f37b-1800-41bd-a383-7904a5d2b7d4',
                title: 'myboardshare',
                columns: {},
            },
            selectedTask: null,
        };
        expect(boardCollectionReducer(
state as BoardCollectionSchema,
boardCollectionActions.removeSelectedBoard(),
        )).toEqual(
            {
                selectedBoardId: '',
                selectedColumnId: '',
                selectedBoard: null,
                selectedTask: null,
            },
        );
    });

    test('setCurrentTask action', () => {
        const state: BoardCollectionSchema = {
            selectedColumnId: '',
            selectedBoardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
            selectedBoard: {
                columns: {
                    'f369fe73-e26a-4ed0-b2e5-9f499582d5cd': {
                        uid: 'f369fe73-e26a-4ed0-b2e5-9f499582d5cd',
                        timeUpdated: '1690050838247',
                        color: '#ff9800',
                        timeCreated: '1690050838247',
                        title: 'Что в процессе',
                        tasks: {},
                    },
                    '2d7579a2-1d17-4fdb-9560-d894c8d83b0f': {
                        color: '#e91e63',
                        uid: '2d7579a2-1d17-4fdb-9560-d894c8d83b0f',
                        timeUpdated: '1687794016078',
                        title: 'Что я планирую',
                        timeCreated: '1687794016078',
                        tasks: {
                            'ccca0f74-b979-4246-bc4c-f12d894a7e51': {
                                timeCreated: '1690050864347',
                                subtasks: {},
                                creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                                title: 'на море',
                                description: '',
                                isCompleted: false,
                                tags: [],
                                uid: 'ccca0f74-b979-4246-bc4c-f12d894a7e51',
                            },
                            'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e': {
                                tags: [],
                                subtasks: {},
                                title: '1e21e22e',
                                creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                                timeCreated: '1688448300529',
                                uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
                                description: '12e',
                                isCompleted: false,
                            },
                        },
                    },
                    'fdfb4726-e8a6-4f52-a1ea-5a6f7646d9be': {
                        timeUpdated: '1690050850112',
                        color: '#2196f3',
                        title: 'Что уже готово',
                        timeCreated: '1690050850112',
                        uid: 'fdfb4726-e8a6-4f52-a1ea-5a6f7646d9be',
                        tasks: {},
                    },
                },
                title: 'Мои планы на лето sdf sd f',
                uid: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                ownerId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                guestPermissions: [
                    GuestPermission.NONE,
                ],
                timeUpdated: '1687794009470',
                timeCreated: '1687794009470',
                usersAllowed: [
                    'IxZ3s0iUvLbjg7E6LvyumG5qW3E3',
                ],
                guestsAllowed: [
                    'FFoSe3HBAkeJE2eOcvcxTFLRdgZ2',
                    'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                ],
            },
            selectedTask: null,
        };

        expect(boardCollectionReducer(
state as BoardCollectionSchema,
boardCollectionActions.setCurrentTask(
    {
        tags: [],
        subtasks: {},
        title: '1e21e22e',
        creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
        timeCreated: '1688448300529',
        uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
        description: '12e',
        isCompleted: false,
    },
),
        )).toEqual({
            selectedBoardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
            selectedColumnId: '2d7579a2-1d17-4fdb-9560-d894c8d83b0f',
            selectedBoard: {
                columns: {
                    'f369fe73-e26a-4ed0-b2e5-9f499582d5cd': {
                        uid: 'f369fe73-e26a-4ed0-b2e5-9f499582d5cd',
                        timeUpdated: '1690050838247',
                        color: '#ff9800',
                        timeCreated: '1690050838247',
                        title: 'Что в процессе',
                        tasks: {},
                    },
                    '2d7579a2-1d17-4fdb-9560-d894c8d83b0f': {
                        color: '#e91e63',
                        uid: '2d7579a2-1d17-4fdb-9560-d894c8d83b0f',
                        timeUpdated: '1687794016078',
                        title: 'Что я планирую',
                        timeCreated: '1687794016078',
                        tasks: {
                            'ccca0f74-b979-4246-bc4c-f12d894a7e51': {
                                timeCreated: '1690050864347',
                                subtasks: {},
                                creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                                title: 'на море',
                                description: '',
                                isCompleted: false,
                                tags: [],
                                uid: 'ccca0f74-b979-4246-bc4c-f12d894a7e51',
                            },
                            'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e': {
                                tags: [],
                                subtasks: {},
                                title: '1e21e22e',
                                creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                                timeCreated: '1688448300529',
                                uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
                                description: '12e',
                                isCompleted: false,
                            },
                        },
                    },
                    'fdfb4726-e8a6-4f52-a1ea-5a6f7646d9be': {
                        timeUpdated: '1690050850112',
                        color: '#2196f3',
                        title: 'Что уже готово',
                        timeCreated: '1690050850112',
                        uid: 'fdfb4726-e8a6-4f52-a1ea-5a6f7646d9be',
                        tasks: {},
                    },
                },
                title: 'Мои планы на лето sdf sd f',
                uid: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                ownerId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                guestPermissions: [
                    'none',
                ],
                timeUpdated: '1687794009470',
                timeCreated: '1687794009470',
                usersAllowed: [
                    'IxZ3s0iUvLbjg7E6LvyumG5qW3E3',
                ],
                guestsAllowed: [
                    'FFoSe3HBAkeJE2eOcvcxTFLRdgZ2',
                    'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                ],
            },
            selectedTask: {
                tags: [],
                subtasks: {},
                title: '1e21e22e',
                creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                timeCreated: '1688448300529',
                uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
                description: '12e',
                isCompleted: false,
            },
        });
    });

    test('removeSelectedTask action', () => {
        const state: BoardCollectionSchema = {
            selectedBoardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
            selectedColumnId: '2d7579a2-1d17-4fdb-9560-d894c8d83b0f',
            selectedBoard: {
                columns: {
                    'f369fe73-e26a-4ed0-b2e5-9f499582d5cd': {
                        uid: 'f369fe73-e26a-4ed0-b2e5-9f499582d5cd',
                        timeUpdated: '1690050838247',
                        color: '#ff9800',
                        timeCreated: '1690050838247',
                        title: 'Что в процессе',
                        tasks: {},
                    },
                    '2d7579a2-1d17-4fdb-9560-d894c8d83b0f': {
                        color: '#e91e63',
                        uid: '2d7579a2-1d17-4fdb-9560-d894c8d83b0f',
                        timeUpdated: '1687794016078',
                        title: 'Что я планирую',
                        timeCreated: '1687794016078',
                        tasks: {
                            'ccca0f74-b979-4246-bc4c-f12d894a7e51': {
                                timeCreated: '1690050864347',
                                subtasks: {},
                                creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                                title: 'на море',
                                description: '',
                                isCompleted: false,
                                tags: [],
                                uid: 'ccca0f74-b979-4246-bc4c-f12d894a7e51',
                            },
                            'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e': {
                                tags: [],
                                subtasks: {},
                                title: '1e21e22e',
                                creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                                timeCreated: '1688448300529',
                                uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
                                description: '12e',
                                isCompleted: false,
                            },
                        },
                    },
                    'fdfb4726-e8a6-4f52-a1ea-5a6f7646d9be': {
                        timeUpdated: '1690050850112',
                        color: '#2196f3',
                        title: 'Что уже готово',
                        timeCreated: '1690050850112',
                        uid: 'fdfb4726-e8a6-4f52-a1ea-5a6f7646d9be',
                        tasks: {},
                    },
                },
                title: 'Мои планы на лето sdf sd f',
                uid: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                ownerId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                guestPermissions: [
                    GuestPermission.NONE,
                ],
                timeUpdated: '1687794009470',
                timeCreated: '1687794009470',
                usersAllowed: [
                    'IxZ3s0iUvLbjg7E6LvyumG5qW3E3',
                ],
                guestsAllowed: [
                    'FFoSe3HBAkeJE2eOcvcxTFLRdgZ2',
                    'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                ],
            },
            selectedTask: {
                tags: [],
                subtasks: {},
                title: '1e21e22e',
                creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                timeCreated: '1688448300529',
                uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
                description: '12e',
                isCompleted: false,
            },
        };

        expect(boardCollectionReducer(
state as BoardCollectionSchema,
boardCollectionActions.removeSelectedTask(),
        )).toEqual({
            selectedBoardId: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
            selectedColumnId: '',
            selectedBoard: {
                columns: {
                    'f369fe73-e26a-4ed0-b2e5-9f499582d5cd': {
                        uid: 'f369fe73-e26a-4ed0-b2e5-9f499582d5cd',
                        timeUpdated: '1690050838247',
                        color: '#ff9800',
                        timeCreated: '1690050838247',
                        title: 'Что в процессе',
                        tasks: {},
                    },
                    '2d7579a2-1d17-4fdb-9560-d894c8d83b0f': {
                        color: '#e91e63',
                        uid: '2d7579a2-1d17-4fdb-9560-d894c8d83b0f',
                        timeUpdated: '1687794016078',
                        title: 'Что я планирую',
                        timeCreated: '1687794016078',
                        tasks: {
                            'ccca0f74-b979-4246-bc4c-f12d894a7e51': {
                                timeCreated: '1690050864347',
                                subtasks: {},
                                creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                                title: 'на море',
                                description: '',
                                isCompleted: false,
                                tags: [],
                                uid: 'ccca0f74-b979-4246-bc4c-f12d894a7e51',
                            },
                            'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e': {
                                tags: [],
                                subtasks: {},
                                title: '1e21e22e',
                                creatorId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                                timeCreated: '1688448300529',
                                uid: 'c2c71bcb-c3d7-41ba-998d-ea2b019bed5e',
                                description: '12e',
                                isCompleted: false,
                            },
                        },
                    },
                    'fdfb4726-e8a6-4f52-a1ea-5a6f7646d9be': {
                        timeUpdated: '1690050850112',
                        color: '#2196f3',
                        title: 'Что уже готово',
                        timeCreated: '1690050850112',
                        uid: 'fdfb4726-e8a6-4f52-a1ea-5a6f7646d9be',
                        tasks: {},
                    },
                },
                title: 'Мои планы на лето sdf sd f',
                uid: 'aa477088-3cd6-452e-a2df-4d3a13f6f668',
                ownerId: 'U70ULZazI9gQOgX8XFh2a3xxVZB3',
                guestPermissions: [
                    'none',
                ],
                timeUpdated: '1687794009470',
                timeCreated: '1687794009470',
                usersAllowed: [
                    'IxZ3s0iUvLbjg7E6LvyumG5qW3E3',
                ],
                guestsAllowed: [
                    'FFoSe3HBAkeJE2eOcvcxTFLRdgZ2',
                    'Tf1GeGjK2rd3yhP7bgl3Qp2DZUW2',
                ],
            },
            selectedTask: null,
        });
    });
});
