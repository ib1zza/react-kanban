import { IColumn } from 'app/types/IBoard';
import { updateDocument } from 'shared/API/updateDocument';
import { ref, update } from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';

export async function editColumn(
    boardId: string,
    columnId: string,
    newData: { [key in keyof IColumn]?: IColumn[key] },
) {
    const updatedData = Object.keys(newData).reduce(
        (acc: { [key: string]: any }, key) => {
            acc[`columns/${columnId}/${key}`] = newData[key as keyof IColumn];
            return acc;
        },
        {},
    );

    // return updateDocument('boards', boardId, updatedData);
    update(ref(rtdb, `boards/${boardId}`), updatedData);
}
