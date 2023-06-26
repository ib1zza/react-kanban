import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function getUserFromEmail(email: string) {
  const ref = collection(db, "users");
  const q = query(ref, where("email", "==", `${email}`));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0]?.data();
}
