import {
    collection, getDocs, query, where,
} from 'firebase/firestore';
import { db } from 'shared/config/firebase/firebase';
import { IUserInfo } from 'app/types/IUserInfo';

export async function getUserFromEmail(
    email: string,
): Promise<IUserInfo | null> {
    const ref = collection(db, 'users');
    const q = query(ref, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return (querySnapshot.docs[0]?.data() as IUserInfo) || null;
}
