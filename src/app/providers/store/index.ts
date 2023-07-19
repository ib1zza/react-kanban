import {
    setCurrentBoard,
    setCurrentTask,
    removeSelectedTask,
    removeSelectedBoard,
} from './Reducers/boardCollectionSlice';

import {
    setNotifications,
    removeNotification,
    acceptNotification,
} from './Reducers/notificationSlice';

import { setUserInfo } from './Reducers/userInfoSlice';

import { useAppDispatch, useAppSelector } from './store';

export {
    setCurrentBoard,
    setCurrentTask,
    removeSelectedTask,
    removeSelectedBoard,
    setNotifications,

    removeNotification,
    acceptNotification,
    setUserInfo,
    useAppSelector,
    useAppDispatch,
};
