import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'shared/config/firebase/firebase';

export async function updateDocument(
    path: string,
    pathSegments: string,
    updateData: { [x: string]: any },
) {
    const ref = doc(db, path, pathSegments);

    return updateDoc(ref, updateData);
}
