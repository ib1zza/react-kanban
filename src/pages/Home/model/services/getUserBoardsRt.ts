import { rtdb } from 'shared/config/firebase/firebase';
import { ref, child, get } from 'firebase/database';
import { IUserInfo } from 'app/types/IUserInfo';
import { IBoard } from 'app/types/IBoard';

export const getUserBoardsRt = async (user: IUserInfo | null) => {
    if (!user) return [];

    const ids = user.boardInvitedIds.concat(user.boardsIds);

    const dbRef = ref(rtdb);

    const getOneBoardInfo = (id: string) => get(child(dbRef, `boards/${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        }
        console.log('No data available');
        return Promise.reject(new Error('No data available'));
    });

    return Promise.allSettled(ids.map((id) => getOneBoardInfo(id))).then(
        (res) => res.map((el) => el.status !== 'rejected' && el.value).filter(Boolean) as IBoard[],
    );
};
