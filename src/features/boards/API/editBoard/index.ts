import { updateDocument } from '../../../users/API/updateDocument';
import { IBoard } from '../../../../app/types/IBoard';

export async function editBoard(
    boardId: string,
    newData: { [key in keyof IBoard]?: IBoard[key] },
) {
    return updateDocument('boards', boardId, newData);
}
