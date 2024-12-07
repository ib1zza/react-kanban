import {useAppSelector} from "app/providers/StoreProvider";
import {LinkedUserType} from "app/types/IBoard";

type useUserRoleType = () => LinkedUserType | null

export const useUserRole: useUserRoleType = () => {
    const user = useAppSelector(state => state.userInfo.user);
    const board = useAppSelector(state => state.boardCollection.selectedBoard);

    if (!user || !board) return null;

    const role = board.users?.[user.uid].role;

    return role || null;
}
