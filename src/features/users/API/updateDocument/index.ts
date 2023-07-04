import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

export async function updateDocument(
  path: string,
  pathSegments: string,
  updateData: { [x: string]: any }
) {
  const ref = doc(db, path, pathSegments);

  return await updateDoc(ref, updateData);
}
