import { IBoard } from '../../../../app/types/IBoard';
import { updateDocument } from '../../../../shared/API/updateDocument';

export async function editBoard(
    boardId: string,
    newData: { [key in keyof IBoard]?: IBoard[key] },
) {
    return updateDocument('boards', boardId, newData);
}
