import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";
import { IUserInfo } from "../../../../app/types/User";

export async function getUserFromEmail(
    email: string
): Promise<IUserInfo | null> {
    const ref = collection(db, "users");
    const q = query(ref, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return (querySnapshot.docs[0]?.data() as IUserInfo) || null;
}
