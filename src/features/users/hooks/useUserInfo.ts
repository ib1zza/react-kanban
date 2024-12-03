import {getAllUsers} from "pages/Home/model/selectors/getAllUsers";
import {useAppDispatch, useAppSelector} from "app/providers/StoreProvider";
import {useCallback, useEffect, useState} from "react";
import {IUserInfo} from "app/types/IUserInfo";
import {homeActions} from "pages/Home/model/slice/HomeSlice";
import {getUserInfo} from "features/users";

type TUseUserInfo = (userId: string) => [IUserInfo | null, () => void];

export const useUserInfo: TUseUserInfo = (userId) => {
    const allUsers = useAppSelector(getAllUsers);
    const [foundUserInfo, setFoundUserInfo] = useState<IUserInfo | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (foundUserInfo) return;

        const tryFindUser = allUsers.find((u) => u.uid === userId);

        if (tryFindUser) {
            console.log("found user", tryFindUser);
            setFoundUserInfo(tryFindUser);
            return;
        }

        refetch();
    }, [allUsers]);

    const refetch = useCallback(() => {
        getUserInfo(userId).then((res) => {
            dispatch(homeActions.addUsers(res))
        });
    }, []);

    return [foundUserInfo, refetch];
}
