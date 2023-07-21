import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { IUserInfo } from '../../../../app/types/User';

export async function getUserInfo(id: string) {
    const ref = doc(db, 'users', id);
    return getDoc(ref).then((doc) => doc.data() as IUserInfo);
}
