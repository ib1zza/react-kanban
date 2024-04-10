import {
    SetStateAction,
    memo, useCallback, useEffect, useState,
} from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useTranslation } from 'react-i18next';
import { useAuth, UserAuth } from 'app/providers/authRouter/ui/AuthContext';
import { editDisplayName, getUserInfo } from 'features/users';
import { storage } from 'shared/config/firebase/firebase';
import { IUserInfo } from 'app/types/IUserInfo';
import Button, { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { Input, InputTheme } from 'shared/ui/Input/Input';
import { updateDocument } from 'shared/API/updateDocument';
import { useAppSelector } from 'app/providers/StoreProvider';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';

import AvatarEdit from '../lib/AvatarEdit/AvatarEdit';
import s from './Profile.module.scss';
import ProfileSkeleton from './ProfileSkeleton';

const Profile = memo(() => {
    const { user } = useAppSelector(getUserState);
    const { refetch } = UserAuth();
    const [editStatus, setEditStatus] = useState(false);
    const [name, setName] = useState<string>('');
    const { t } = useTranslation('profile');
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
    const { logOut } = useAuth();
    const fetchUserInfo = useCallback(async () => {
        if (!user?.uid) return;
        return getUserInfo(user.uid).then((res) => {
            setUserInfo(res as SetStateAction<IUserInfo | null>);
            setName(res?.displayName || '');
        });
    }, [user?.uid]);

    useEffect(() => {
        fetchUserInfo();
    }, [user]);

    const handleSubmit = useCallback(async () => {
        if (!user || !/^[a-z0-9_]+$/.test(name)) return;
        await editDisplayName(user.uid, name);
        fetchUserInfo();
    }, [fetchUserInfo, name, user]);

    const onAvatarUpdate = useCallback(async (file: File) => {
        if (!user?.displayName) return;

        const storageRef = ref(storage, user.displayName);
        const uploadImage = uploadBytesResumable(storageRef, file);

        uploadImage.on(
            'state_changed',
            (snapshot) => {

            },
            (error) => {
                // console.log(error);
            },
            () => {
                getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
                    await updateDocument('users', user.uid, { photoURL: downloadURL });

                    refetch();
                    fetchUserInfo();
                });
                return true;
            },
        );
    }, [fetchUserInfo, refetch, user?.displayName, user?.uid]);

    if (!user || !userInfo) return <ProfileSkeleton />;
    return (
        <div>
            <div className={s.profile}>
                <div className={s.profile__avatar}>
                    <AvatarEdit onEdit={onAvatarUpdate} avatar={userInfo.photoURL} alt={userInfo.displayName} />
                </div>
                <div>
                    <div className={s.profile__name}>
                        <p>
                            {t('Имя')}
                            :
                        </p>
                        {editStatus ? (
                            <Input
                                value={name}
                                theme={InputTheme.BORDERED}
                                onChange={(e: { target: { value: any; }; }) => setName(e.target.value)}
                            />
                        ) : (
                            <p>
                                {userInfo.displayName}
                            </p>
                        )}
                    </div>
                    <div className={s.profile__email}>
                        <p>
                            {t('Почта')}
                            :
                        </p>
                        <p>
                            {user.email}
                        </p>

                    </div>
                    <div className={s.profile__descr}>
                        <p>
                            {t('Statistics')}
                            :
                        </p>
                        <p>
                            {t('Количество досок')}
                            :
                            {` ${userInfo.boardsIds?.length}` || 0}
                            <br />
                            {t('Joined')}
                            :
                            DATA
                        </p>
                    </div>
                    <div className={s.buttons}>

                        {editStatus ? (
                            <Button
                                theme={ButtonTheme.BLACK}
                                size={ButtonSize.M}
                                onClick={() => {
                                    setEditStatus(false);
                                    handleSubmit();
                                }}
                                className={s.profile__save}
                            >
                                {t('Сохранить')}
                            </Button>
                        ) : (
                            <Button
                                theme={ButtonTheme.BLACK}
                                size={ButtonSize.M}
                                onClick={() => setEditStatus(true)}
                                className={s.profile__edit}
                            >
                                {t('Изменить')}
                            </Button>
                        )}
                        <Button
                            onClick={logOut}
                            theme={ButtonTheme.RED}
                            size={ButtonSize.M}
                            className={s.logout}
                        >
                            {t('Выйти')}
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
});

export default Profile;
