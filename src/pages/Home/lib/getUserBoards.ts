import { IUserInfo } from '../../../app/types/User';
import { getBoardFromId } from '../../../entities/Board';
import { IBoard } from '../../../app/types/IBoard';

export const getUserBoards = async (user: IUserInfo | null): Promise<IBoard[]> => {
    if (!user) return [];

    const ids = user.boardInvitedIds.concat(user.boardsIds);
    return await Promise.allSettled(ids.map((id) => getBoardFromId(id))).then(
        (res) => res.map((el) => el.status !== 'rejected' && el.value).filter(Boolean) as IBoard[],
    );
};
