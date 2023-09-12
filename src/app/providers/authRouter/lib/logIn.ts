import {
    browserLocalPersistence,
    browserSessionPersistence,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth';

export const loginByEmailPass = async (email: string, password: string, remember: boolean) => {
    const auth = getAuth();
    return setPersistence(auth, remember
        ? browserLocalPersistence
        : browserSessionPersistence).then(() => signInWithEmailAndPassword(auth, email, password)).then((res) => {
        console.log(res);
        return res.user;
    });
};
