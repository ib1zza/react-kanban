import React, { useEffect, useState } from "react";
import s from "./Profile.module.scss";
import { UserAuth } from "../../../app/providers/authRouter/ui/AuthContext";
import { getUserInfo } from "../../../features/users/API/getUserInfo";
import { editDisplayName } from "../../../features/users/API/editDisplayName";
import { IUserInfo } from "../../../app/types/User";
import AvatarEdit from "../lib/AvatarEdit/AvatarEdit";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { updateDocument } from "../../../features/users/API/updateDocument";
import { updateProfile } from "firebase/auth";
import { useTranslation } from "react-i18next";

const Profile = () => {
    const { user, refetch } = UserAuth();
    const [editStatus, setEditStatus] = useState(false);
    const [name, setName] = useState<any>("");
    const {t} = useTranslation('profile')
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

    const fetchUserInfo = async () => {
        if (!user?.uid) return;
        return await getUserInfo(user.uid).then((res) => {
            setUserInfo(res);
            console.log(res);
        });
    };
    useEffect(() => {
        fetchUserInfo();
    }, [user]);

    const handleSubmit = async () => {
        if (!user || !/^[a-z0-9_]+$/.test(name)) return;
        await editDisplayName(user.uid, name);
        fetchUserInfo();
    };

    const onAvatarUpdate = async (file: File) => {
        if (!user?.displayName) return;

        const storageRef = ref(storage, user.displayName);
        const uploadImage = uploadBytesResumable(storageRef, file);

        await uploadImage.on(
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
                console.log(error);
            },
            () => {
                getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
                    await updateDocument("users", user.uid, { photoURL: downloadURL });
                    await updateProfile(user, {
                        photoURL: downloadURL,
                    });
                    refetch();
                    fetchUserInfo();
                });
                return true;
            }
        );
    };

    if (!user || !userInfo) return null;
    return (
        <div>
            <div className={s.profile}>
                <AvatarEdit onEdit={onAvatarUpdate} avatar={userInfo.photoURL} />
                <div>
                    <div className={s.profile__name}>
                        {t('Имя')}:{" "}
                        {editStatus ? (
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={s.profile__input}
                            />
                        ) : (
                            userInfo.displayName
                        )}
                    </div>

                    <div className={s.profile__email}>
                        {t('Почта')}:
                        {user.email}
                    </div>
                    <div> {t('Количество досок')}: {userInfo.boardsIds?.length || 0}</div>
                    {editStatus ? (
                        <button
                            onClick={() => {
                                setEditStatus(false);
                                handleSubmit();
                            }}
                            className={s.profile__save}
                        >
                            {t('Сохранить')}
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditStatus(true)}
                            className={s.profile__edit}
                        >
                            {t('Изменить')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
