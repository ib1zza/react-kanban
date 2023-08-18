import { doc, getDoc } from 'firebase/firestore';
import { db } from 'shared/config/firebase/firebase';
import { IUserInfo } from 'app/types/IUserInfo';

export async function getUserInfo(id: string) {
    const ref = doc(db, 'users', id);
    return getDoc(ref).then((doc) => doc.data() as IUserInfo);
}
