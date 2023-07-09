import {getBoardFromId} from "../../../../entities/Board";


export async function getTaskInfo(
    boardId: string,
    columnId: string,
    taskId: string
) {
    return await getBoardFromId(boardId).then((board) => {
        return board.columns[columnId].tasks[taskId];
    });
}

//f1763b0b-2986-468c-9431-cf4948b4803a.columns.6d162780-3d35-4041-b417-c6ed42afe7d7.tasks.d52e2775-c13d-43b7-8992-32d1b181c819
