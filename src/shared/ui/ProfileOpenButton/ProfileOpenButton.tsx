import { classNames } from 'shared/lib/classNames/classNames';
import React, { Suspense, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/ui/Modal/Modal';
import ProfileSkeleton from 'features/Profile/ui/ProfileSkeleton';
import { Profile } from 'features/Profile';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import s from './ProfileOpenButton.module.scss';

interface ProfileOpenButtonProps {
    className?: string
}
const ProfileOpenButton = ({ className } : ProfileOpenButtonProps) => {
    const [isShowProfile, setIsShownProfile] = useState(false);
    const { t } = useTranslation();

    return (
        <>
            <Button
                theme={ButtonTheme.CLEAR}
                className={classNames('', {}, [className as string])}
                onClick={() => setIsShownProfile((prev) => !prev)}
                icon={faUser}
            />
            {isShowProfile && (
                <Modal title={t('Profile')} onClose={() => setIsShownProfile(false)}>
                    <Suspense fallback={<ProfileSkeleton />}>
                        <Profile />
                    </Suspense>
                </Modal>
            )}
        </>

    );
};

export { ProfileOpenButton };
