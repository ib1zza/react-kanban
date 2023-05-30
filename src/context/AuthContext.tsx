import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// import { setDoc, doc, getDocs, collection } from "firebase/firestore";

type context = {
  signUp: () => void;
  logIn: () => void;
  logOut: () => void;
  user: any;
};
const AuthContext = createContext<any>(null);
export function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState({});
  const [store, setStore] = useState<any>();
  function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password);
    // setDoc(doc(db, "users", email), {

    // });
  }
  // const getCollection = async () => {
  //   const citiesRef = collection(db, "users");
  //   const docsSnap = await getDocs(citiesRef);
  //   docsSnap.forEach((doc) => {
  //     setStore(doc.data());
  //   });
  // };

  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }
  // useEffect(() => {
  //   getCollection();
  // }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, store }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
