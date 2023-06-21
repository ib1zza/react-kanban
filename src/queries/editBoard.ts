import { updateDocument } from "./utils/updateDocument";
import {IBoard} from "../types/IBoard";


export async function editBoard (boardId: string, newData: {[key in keyof IBoard]?: IBoard[key]}) {
    console.log(newData)
    return await updateDocument("boards", boardId, newData);
}