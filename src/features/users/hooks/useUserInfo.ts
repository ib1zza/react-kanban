import { getAllUsers } from 'pages/Home/model/selectors/getAllUsers';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { useCallback, useEffect, useState } from 'react';
import { IUserInfo } from 'app/types/IUserInfo';
import { homeActions } from 'pages/Home/model/slice/HomeSlice';
import { getUserInfo } from 'features/users';

type TUseUserInfo = (userId: string) => [IUserInfo | null, () => void];

export const useUserInfo: TUseUserInfo = (userId) => {
    const allUsers = useAppSelector(getAllUsers);
    const [foundUserInfo, setFoundUserInfo] = useState<IUserInfo | null>(null);
    const dispatch = useAppDispatch();

    const refetch = useCallback(() => {
        getUserInfo(userId).then((res) => {
            dispatch(homeActions.addUsers(res));
        });
    }, []);

    useEffect(() => {
        if (foundUserInfo) return;

        const tryFindUser = allUsers.find((u) => u.uid === userId);

        if (tryFindUser) {
            setFoundUserInfo(tryFindUser);
            return;
        }

        refetch();
    }, [allUsers]);

    return [foundUserInfo, refetch];
};
