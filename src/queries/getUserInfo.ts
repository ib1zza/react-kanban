import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IUserInfo } from "../types/User";

export async function getUserInfo(id: string) {
  const ref = doc(db, "users", id);
  return await getDoc(ref).then((doc) => {
    return doc.data() as IUserInfo;
  });
}
