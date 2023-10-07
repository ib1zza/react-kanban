import { child, get, ref } from 'firebase/database';
import { IBoard } from 'app/types/IBoard';
import { rtdb } from 'shared/config/firebase/firebase';

export const getBoardsRt = (ids: string[]) => {
    const dbRef = ref(rtdb);

    const getOneBoardInfo = (id: string) => get(child(dbRef, `boards/${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return snapshot.val();
        }
        console.log('No data available');
        return Promise.reject(new Error('No data available'));
    });

    return Promise.allSettled(ids.map((id) => getOneBoardInfo(id))).then(
        (res) => res.map((el) => el.status !== 'rejected' && el.value).filter(Boolean) as IBoard[],
    );
};
