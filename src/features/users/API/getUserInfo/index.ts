import { doc, getDoc } from 'firebase/firestore';
import { db } from 'shared/config/firebase/firebase';
import {IUserInfo} from "app/types/IUserInfo";

export async function getUserInfo(id: string): Promise<IUserInfo> {
    const ref = doc(db, 'users', id);
    const docSnap = await getDoc(ref);
    return docSnap.data() as IUserInfo;
}
