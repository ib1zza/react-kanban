import { IBoard } from 'app/types/IBoard';
import { subscribe } from 'shared/API/subscribe';

export function subscribeToBoardById(id: string, cb: (data: IBoard) => void) {
    return subscribe<IBoard>(`boards/${id}`, cb);
}
