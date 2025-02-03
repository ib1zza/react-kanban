import {
    get, ref, set, update,
} from 'firebase/database';
import { rtdb } from 'shared/config/firebase/firebase';
import { IBoardFromServer, LinkedUserType } from 'app/types/IBoardFromServer';
import { getBoardFromId } from 'entities/Board';

export const checkIfBoardIsPublic = async (
    boardId: string,
) => {
    // добавляем доску в userBoards пользователя
    const boardRef = ref(rtdb, `boards/${boardId}`);

    try {
        const snapshot = await get(boardRef);

        if (snapshot.exists()) {
            const boardData = snapshot.val();

            // Check if the board is public
            if (boardData.public === true) {
                return boardData as IBoardFromServer;
            }
            console.log('Board is not public.');
            return null; // Or throw an error if you prefer
        }
        console.log('Board not found.');
        return null; // Or throw an error if you prefer
    } catch (error) {
        console.error('Error fetching board:', error);
        return null; // Or throw an error if you prefer
    }
};

export const connectToBoardRt = async (userId: string, boardId: string): Promise<boolean> => {
    const boardRef = ref(rtdb, `boards/${boardId}`);

    try {
        const snapshot = await get(boardRef);

        if (snapshot.exists()) {
            const boardData = snapshot.val();

            // Check if the board is public
            if (boardData.public === true) {
                return true;
            }

            return !!boardData.users[userId];
        }
    } catch (error) {
        console.error('Error fetching board:', error);
        return false;
    }

    return false;
};

export const joinBoardRt = async (userId: string, id: string) => {
    // http://localhost:3000/board/5bfd279f-838c-4f49-98a1-da2c6adabb0c

    const parseBoardId = (id: string) => {
        if (id.startsWith('http')) {
            return id.split('/').pop() as string;
        }
        return id;
    };

    const boardId = parseBoardId(id);

    const board = await checkIfBoardIsPublic(boardId);

    if (!board) {
        return false;
    }

    // добавляем доску в userBoards пользователя

    await update(ref(rtdb, `usersBoards/${userId}`), {
        [boardId]: true,
    });
    await set(ref(rtdb, `boards/${boardId}/users/${userId}`), {
        dateInvited: Date.now(),
        role: LinkedUserType.GUEST,
        joined: true,
    });

    return true;
};
