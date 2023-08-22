import {
    browserLocalPersistence,
    browserSessionPersistence,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth';

export const loginByEmailPass = async (email: string, password: string, remember: boolean) => {
    const auth = getAuth();
    setPersistence(auth, remember
        ? browserLocalPersistence
        : browserSessionPersistence).then(async () => {
        await signInWithEmailAndPassword(auth, email, password);
    }).then((res) => console.log(res));
};
