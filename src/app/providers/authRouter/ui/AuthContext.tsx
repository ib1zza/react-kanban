import React, {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    signOut, User, onAuthStateChanged,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from 'shared/config/firebase/firebase';

import { getUserInfo } from 'features/users';
import { userInfoActions } from 'features/users/model/slice/userInfoSlice';
import { signUpEmailPass } from '../lib/signUp';
import { loginByEmailPass } from '../lib/logIn';

type ISelect = 'practice' | 'work' | 'study' | 'other';

interface IAuthContext {
    signUp: (
        email: string,
        password: string,
        displayName: string,
        select: ISelect,
        photoFile?: any
    ) => void;

    logIn: (
        email: string,
        password: string, rememberMe: boolean
    ) => Promise<User>;
    logOut: () => void;
    refetch: () => void;
    user?: User | null;
}

const AuthContext = createContext<IAuthContext>({
    logIn: () => {
    },
    signUp: () => {
    },
    logOut: () => {
    },
    refetch: () => {
    },
    user: null,
} as unknown as IAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [user, setUser] = useState<User>({} as User);
    const signUp = signUpEmailPass;
    const logIn = loginByEmailPass;
    const dispatch = useDispatch();

    function logOut() {
        return signOut(auth).then((res) => dispatch(userInfoActions.clearUserInfo()));
    }

    async function refetch() {
        console.log('refetch');
        if (user?.uid) {
            await user.reload();
            getUserInfo(user.uid).then((res) => {
                if (res) {
                    dispatch(userInfoActions.setUserInfo(res));
                }
            });
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
            setUser(currentUser as User);
            console.log(currentUser);
            if (user?.uid) {
                getUserInfo(user.uid).then((res) => {
                    if (res) {
                        console.log('getUserUseEffect', res);
                        dispatch(userInfoActions.setUserInfo(res));
                    }
                });
            }
        });
        return () => {
            unsubscribe();
        };
    }, [user]);
    const value = useMemo(() => ({
        signUp, logIn, logOut, refetch, user,
    }), [user]);
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export function UserAuth() {
    return useContext(AuthContext);
}
