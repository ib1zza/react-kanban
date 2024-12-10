import { getBoardFromId } from 'entities/Board';
import { IBoardFromServer } from 'app/types/IBoardFromServer';
import { IUserInfo } from 'app/types/IUserInfo';

export const getUserBoards = async (user: IUserInfo | null): Promise<IBoardFromServer[]> => {
    if (!user) return [];

    const ids = user.boardInvitedIds.concat(user.boardsIds);
    return Promise.allSettled(ids.map((id) => getBoardFromId(id))).then(
        (res) => res.map((el) => el.status !== 'rejected' && el.value).filter(Boolean) as IBoardFromServer[],
    );
};
