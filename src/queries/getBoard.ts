import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {IBoard} from "../types/IBoard";


export async function getBoard(id: string) {
    const ref = doc(db, "boards", id);
    return await getDoc(ref).then((doc) => {
        return doc.data() as IBoard;
    });
}