import {
    IBoard, IBoardFromServer, IBoardUserInfo, IColumn,
} from 'app/types/IBoardFromServer';

export function mapBoardFromServer(board: IBoardFromServer): IBoard {
    // Map columns from IColumnFromServer to IColumn
    const columns: IColumn[] = Object.values(board.columns || {}).map((column) => ({
        uid: column.uid,
        title: column.title,
        tasks: Object.values(column.tasks || {}), // Convert tasks from object to array
        timeCreated: column.timeCreated,
        timeUpdated: column.timeUpdated,
        color: column.color,
        displayIndex: column.displayIndex,
    })).sort((a, b) => a.displayIndex - b.displayIndex);

    // Map users from the server format to the board format
    const users: IBoardUserInfo[] | undefined = board.users
        ? Object.entries(board.users).map(([userId, userInfo]) => ({
            uid: userId,
            role: userInfo.role,
            dateInvited: userInfo.dateInvited,
            joined: userInfo.joined,
            notificationUid: userInfo.notificationUid,
        }))
        : undefined;

    // Return the mapped IBoard object
    return {
        uid: board.uid,
        columns,
        guestPermissions: board.guestPermissions,
        // guestsAllowed: board.guestsAllowed,
        ownerId: board.ownerId,
        title: board.title,
        // usersAllowed: board.usersAllowed,
        timeCreated: board.timeCreated,
        timeUpdated: board.timeUpdated,
        users,
    };
}
