import { ref, onValue } from 'firebase/database';
import { rtdb } from '../config/firebase/firebase';

export const subscribe = <T >(path: string, cb: (snap: T) => void) => onValue(ref(rtdb, path), (snapshot) => {
    const data = snapshot.val();
    cb(data as T);
});
