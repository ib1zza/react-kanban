import React, {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../../../../firebase';
import { signUpEmailPass } from '../../../../pages/SignUp/lib/signUp';
import { loginByEmailPass } from '../../../../pages/Login/lib/logIn';
import { setUserInfo } from '../../store/Reducers/userInfoSlice';
import { getUserInfo } from '../../../../features/users/API/getUserInfo';

// import { setDoc, doc, getDocs, collection } from "firebase/firestore";
type ISelect = 'practice' | 'work' | 'study' | 'other';

interface IAuthContext {
  signUp: (
    email: string,
    password: string,
    displayName: string,
    select: ISelect,
    photoFile?: any
  ) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  refetch: () => void;
  user: User | null;
}

const AuthContext = createContext<IAuthContext>({
    signUp: () => {},
    logIn: () => {},
    logOut: () => {},
    refetch: () => {},
    user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [user, setUser] = useState<User>({} as User);
    const signUp = signUpEmailPass;
    const logIn = loginByEmailPass;
    const dispatch = useDispatch();
    function logOut() {
        signOut(auth);
    }
    async function refetch() {
        console.log('refetch');
        if (user?.uid) {
            await user.reload();
            getUserInfo(user.uid).then((res) => {
                if (res) {
                    dispatch(setUserInfo(res));
                    console.log(res.photoURL);
                }
            });
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: User) => {
            setUser(currentUser);
            if (user?.uid) {
                getUserInfo(user.uid).then((res) => {
                    if (res) {
                        dispatch(setUserInfo(res));
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
