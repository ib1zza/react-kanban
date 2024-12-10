import {useAppSelector} from "app/providers/StoreProvider";
import {LinkedUserType} from "app/types/IBoardFromServer";

type useUserRoleType = () => LinkedUserType | null

export const useUserRole: useUserRoleType = () => {
    const user = useAppSelector(state => state.userInfo.user);
    const board = useAppSelector(state => state.boardCollection.selectedBoard);

    if (!user || !board) return null;

    const userInBoard = board.users?.find(el => el.uid === user.uid);

    if (!userInBoard) return null;

    const role = userInBoard.role;

    return role || null;
}
