/* eslint-disable max-len */

import {
    browserLocalPersistence,
    getAuth,
    inMemoryPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth';

// eslint-disable-next-line no-async-promise-executor
export const loginByEmailPass = async (email: string, password: string, remember: boolean) => new Promise(async (resolve, reject) => {
    const auth = getAuth();

    if (remember) {
        await getAuth().setPersistence(browserLocalPersistence).catch((error) => reject(-1));
    } else {
        await getAuth().setPersistence(inMemoryPersistence).catch((error) => reject(-1));
    }
    signInWithEmailAndPassword(auth, email, password).catch((error) => error);
});
