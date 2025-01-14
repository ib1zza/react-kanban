import { getAllUsers } from 'pages/Home/model/selectors/getAllUsers';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { useCallback, useEffect, useState } from 'react';
import { IUserInfo } from 'app/types/IUserInfo';
import { homeActions } from 'pages/Home/model/slice/HomeSlice';
import { getUserInfo } from 'features/users';

type TUseUsersInfo = (userIds: string[]) => [IUserInfo[], () => void];

export const useUsersInfo: TUseUsersInfo = (userIds) => {
    const allUsers = useAppSelector(getAllUsers);
    const [foundUsersInfo, setFoundUsersInfo] = useState<IUserInfo[]>([]);
    const dispatch = useAppDispatch();

    const refetch = useCallback(() => {
        const fetchPromises = userIds.map((userId) => getUserInfo(userId).then((res) => {
            dispatch(homeActions.addUsers(res));
        }));

        // Wait for all fetch promises to resolve
        Promise.all(fetchPromises).then(() => {
            // After fetching, update the found users info
            const updatedUsersInfo = userIds.map(
                (userId) => allUsers.find((u) => u.uid === userId),
            ).filter(Boolean) as IUserInfo[];
            setFoundUsersInfo(updatedUsersInfo);
        });
    }, [userIds, dispatch, allUsers]);

    useEffect(() => {
        const usersInfo = userIds.map(
            (userId) => allUsers.find((u) => u.uid === userId),
        ).filter(Boolean) as IUserInfo[];

        if (usersInfo.length === userIds.length) {
            // All users found in the state
            setFoundUsersInfo(usersInfo);
            return;
        }

        // If not all users are found, refetch
        refetch();
    }, [allUsers, refetch, userIds]);

    return [foundUsersInfo, refetch];
};
