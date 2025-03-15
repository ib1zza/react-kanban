import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth, UserAuth } from 'app/providers/authRouter/ui/AuthContext';
import Button, { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { Input, InputTheme } from 'shared/ui/Input/Input';

import { useLogic } from 'features/Profile/lib/hooks/useLogic';
import AvatarEdit from '../lib/AvatarEdit/AvatarEdit';
import s from './Profile.module.scss';
import ProfileSkeleton from './ProfileSkeleton';

const Profile = memo(() => {
    const { t } = useTranslation('profile');

    const {
        name,
        userInfo,
        editStatus,
        onAvatarUpdate,
        handleSubmit,
        setEditStatus,
        userFirebase,
        setName,
    } = useLogic();
    const { logOut } = useAuth();

    if (!userFirebase || !userInfo) return <ProfileSkeleton />;
    return (
        <div>
            <div className={s.profile}>
                <div className={s.profile__avatar}>
                    <AvatarEdit
                        onEdit={onAvatarUpdate}
                        avatar={userInfo.photoURL}
                        alt={userInfo.displayName}
                    />
                </div>
                <div>
                    <div className={s.profile__name}>
                        <p>{t('Имя')}:</p>
                        {editStatus ? (
                            <Input
                                value={name}
                                theme={InputTheme.BORDERED}
                                onChange={(e) => setName(e.target.value)}
                            />
                        ) : (
                            <p>{userInfo.displayName}</p>
                        )}
                    </div>
                    <div className={s.profile__email}>
                        <p>{t('Почта')}:</p>
                        <p>{userInfo.email}</p>
                    </div>
                    <div className={s.profile__descr}>
                        <p>{t('Statistics')}:</p>
                        <p>
                            {t('Количество досок')}:{` ${userInfo.boardsIds?.length}` || 0}
                            <br />
                            {t('Joined')}:
                            {` ${new Date(
                                +userFirebase.metadata.createdAt
                            ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}`}
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
