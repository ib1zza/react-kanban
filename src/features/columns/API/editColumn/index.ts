import { updateDocument } from '../../../users/API/updateDocument';
import { IColumn } from '../../../../app/types/IBoard';

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

    console.log(updatedData);

    return await updateDocument('boards', boardId, updatedData);
}
