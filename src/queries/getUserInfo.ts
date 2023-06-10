import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface FirebaseUserInfo {
    displayName: string;
    boardIds: string[];
    boardInvitedIds: string[];
    select: string;
    photoURL: string;
    uid: string;
}


export async function getUserInfo(id: string) {
    const ref = doc(db, "users", id);
    return await getDoc(ref).then((doc) => {
        return doc.data() as FirebaseUserInfo;
    });
}