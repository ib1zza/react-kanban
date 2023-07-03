import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const signUpEmailPass = async (
  email: string,
  password: string,
  displayName: string,
  select: string,
  photoFile?: any
): Promise<string | void> => {
  if (!displayName || !email || !password) {
    return Promise.reject("Заполните все поля");
  }

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (photoFile) {
      const storageRef = ref(storage, displayName);

      const uploadImage = uploadBytesResumable(storageRef, photoFile);

      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Image upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          return Promise.reject(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName: displayName.toLowerCase(),
              photoURL: downloadURL,
            });
            console.log("File available at", downloadURL);
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName: displayName.toLowerCase(),
              email,
              photoURL: downloadURL,
              boardIds: [],
              boardInvitedIds: [],
              select,
              // TODO unreadNotifications:
              // unreadNotifications: ,
            });
          });
        }
      );
    } else {
      await updateProfile(response.user, {
        displayName: displayName.toLowerCase(),
      });

      await setDoc(doc(db, "users", response.user.uid), {
        uid: response.user.uid,
        displayName: displayName.toLowerCase(),
        email,
        boardIds: [],
        boardInvitedIds: [],
        select,
      });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};