import { IBoardFromServer } from 'app/types/IBoardFromServer';
import { subscribe } from 'shared/API/subscribe';

export function subscribeToBoardById(id: string, cb: (data: IBoardFromServer) => void) {
    return subscribe<IBoardFromServer>(`boards/${id}`, cb);
}
