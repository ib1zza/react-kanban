/* eslint-disable max-len */
import { loginActions } from 'features/auth/login';
import {
    browserLocalPersistence,
    getAuth,
    inMemoryPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line no-async-promise-executor
export const loginByEmailPass = async (email: string, password: string, remember: boolean) => new Promise(async (resolve, reject) => {
    const auth = getAuth();

    if (remember) {
        await getAuth().setPersistence(browserLocalPersistence).catch((error) => reject(-1));
    } else {
        await getAuth().setPersistence(inMemoryPersistence).catch((error) => reject(-1));
    }
    signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        // Signed in
        const { user } = userCredential;
        return user;
    }).catch((error) => console.log(error.code));
});
