import React, { useEffect, useState } from "react";
import s from "./Profile.module.scss";
import { UserAuth } from "../../context/AuthContext";
import {getUserInfo} from "../../queries/getUserInfo";
import {editDisplayName} from "../../queries/editDisplayName";
import {IUserInfo} from "../../types/User";

const Profile = () => {
  const { user, refetch } = UserAuth();
  const [editStatus, setEditStatus] = useState(false);
  const [name, setName] = useState<any>("");

  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

  useEffect(() => {
    if(!user?.uid) return
    getUserInfo(user.uid).then((res) => {
      setUserInfo(res)
      console.log(res)
    })
  },[user])

  //TODO: изменение значения сразу после сабмита
  const handleSubmit = async () => {
    if(!user || !(/^[a-z0-9_]+$/).test(name)) return
    await  editDisplayName(user.uid, name)
    getUserInfo(user.uid).then((res) => {
      setUserInfo(res)
    })
    // await updateProfile(user as User, { displayName: name });
    // refetch();
  };

  // useEffect(() => {
  //   if (user?.displayName) {
  //     setName(user?.displayName);
  //   }
  // }, [user?.displayName]);

  if(!user || !userInfo) return null
  return (
    <div>
      <div className={s.profile}>
        <div className={s.profile__avatar}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1124_167)">
              <circle cx="20" cy="20" r="20" fill="white" />
              <path
                d="M20 39.2C30.6039 39.2 39.2 30.6039 39.2 20C39.2 9.39612 30.6039 0.799988 20 0.799988C9.39612 0.799988 0.799988 9.39612 0.799988 20C0.799988 30.6039 9.39612 39.2 20 39.2Z"
                stroke="white"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M23.9464 28.4224C23.8296 27.1328 23.8744 26.2328 23.8744 25.0544C24.4584 24.748 25.5048 22.7944 25.6816 21.144C26.1408 21.1064 26.8648 20.6584 27.0768 18.8896C27.1912 17.94 26.7368 17.4056 26.46 17.2376C27.2072 14.9904 28.7592 8.03841 23.5896 7.32001C23.0576 6.38561 21.6952 5.91281 19.9248 5.91281C12.8416 6.04321 11.9872 11.2616 13.54 17.2376C13.264 17.4056 12.8096 17.94 12.9232 18.8896C13.136 20.6584 13.8592 21.1064 14.3184 21.144C14.4944 22.7936 15.5824 24.748 16.168 25.0544C16.168 26.2328 16.212 27.1328 16.0952 28.4224C15.0864 31.1344 9.90561 31.3464 6.91681 33.9616C10.0416 37.108 15.1056 39.3584 20.4496 39.3584C25.7936 39.3584 32.0752 35.1392 33.1208 33.988C30.1504 31.3488 24.9576 31.144 23.9464 28.4224Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_1124_167">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div>
          <div className={s.profile__name}>
            Имя:{" "}
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
            Почта:
            {user.email}
          </div>
          {editStatus ? (
            <button
              onClick={() => {
                setEditStatus(false);
                handleSubmit();
              }}
              className={s.profile__save}
            >
              Сохранить
            </button>
          ) : (
            <button
              onClick={() => setEditStatus(true)}
              className={s.profile__edit}
            >
              Изменить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
