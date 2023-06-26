import { collection, getDocs, or, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const getBoards = async (user: any, setBoards: (res: any) => void) => {
  const dataRef = query(
    collection(db, "boards"),
    or(
      where("usersAllowed", "array-contains", `${user?.uid}`),
      where("ownerId", "==", `${user?.uid}`)
    )
  );
  const docsSnap = await getDocs(dataRef);
  const res: any[] = [];
  docsSnap.forEach((doc) => {
    res.push({
      uid: doc.data().uid,
      title: doc.data().title,
      usersAllowed: doc.data().usersAllowed,
      timeCreated: doc.data().timeCreated,
      timeUpdated: doc.data().timeUpdated,
      ownerId: doc.data().ownerId,
      guestPermissions: doc.data().guestPermissions,
      guestsAllowed: doc.data().guestsAllowed,
    });
  });
  setBoards(res);
};
