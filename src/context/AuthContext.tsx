import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
    User,
  onAuthStateChanged,
} from "firebase/auth";
import {signUpEmailPass} from "../queries/signUp";
import {loginByEmailPass} from "../queries/logIn";

// import { setDoc, doc, getDocs, collection } from "firebase/firestore";
type ISelect = "practice" | "work" | "study" | "other";

interface IAuthContext {
  signUp: (email: string, password: string, displayName: string, select: ISelect, photoFile?: any) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  user: User | null;
}



const AuthContext = createContext<IAuthContext>({
  signUp: () => {},
  logIn: () => {},
  logOut: () => {},
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState<User>({} as User);
  // const [store, setStore] = useState<any>();
  const signUp = signUpEmailPass;
  const logIn = loginByEmailPass;

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
