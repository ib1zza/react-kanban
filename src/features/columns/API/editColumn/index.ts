import { IColumn } from 'app/types/IBoard';
import { updateDocument } from 'shared/API/updateDocument';

export async function editColumn(
    boardId: string,
    columnId: string,
    newData: { [key in keyof IColumn]?: IColumn[key] },
) {
    const updatedData = Object.keys(newData).reduce(
        (acc: { [key: string]: any }, key: keyof IColumn) => {
            acc[`columns.${columnId}.${key}`] = newData[key];
            return acc;
        },
        {},
    );

    return updateDocument('boards', boardId, updatedData);
}
