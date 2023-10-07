import { subscribe } from 'shared/API/subscribe';

// returns ids of user's boards
export function subscribeToUserBoards(userId: string, cb: (data: string[]) => void) {
    // console.log('sub', id);
    return subscribe<string[]>(`usersBoards/${userId}`, cb);
}
