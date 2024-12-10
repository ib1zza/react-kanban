import { IColumnFromServer } from 'app/types/IBoardFromServer';
import { ref, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export async function editColumn(
    boardId: string,
    columnId: string,
    newData: { [key in keyof IColumnFromServer]?: IColumnFromServer[key] },
) {
    const updatedData = Object.keys(newData).reduce(
        (acc: { [key: string]: any }, key) => {
            acc[`columns/${columnId}/${key}`] = newData[key as keyof IColumnFromServer];
            return acc;
        },
        {},
    );

    // return updateDocument('boards', boardId, updatedData);
    return await update(ref(rtdb, `boards/${boardId}`), updatedData);
}
