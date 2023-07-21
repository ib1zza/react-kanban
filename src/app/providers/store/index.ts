import {
    removeSelectedBoard,
    removeSelectedTask,
    setCurrentBoard,
    setCurrentTask,
} from './Reducers/boardCollectionSlice';

import {
    acceptNotification,
    removeNotification,
    setNotifications,
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
