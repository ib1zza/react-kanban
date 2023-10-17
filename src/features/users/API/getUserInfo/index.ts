import { doc, getDoc } from 'firebase/firestore';
import { db } from 'shared/config/firebase/firebase';

export async function getUserInfo(id: string) {
    const ref = doc(db, 'users', id);
    const docSnap = await getDoc(ref);
    // const x = await getDoc(ref).then(async (doc) => await doc.data() as IUserInfo);
    return docSnap.data();
    // eslint-disable-next-line no-alert
}
