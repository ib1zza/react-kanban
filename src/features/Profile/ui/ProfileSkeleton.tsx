import Button from 'shared/ui/Button/Button';

import Skeleton from 'react-loading-skeleton';

import s from './Profile.module.scss';

const Profile = () => (
    <div>
        <div className={s.profile}>
            <Skeleton circle height={150} width={150} />
            <div>
                <div className={s.profile__name}>
                    <Skeleton width={140} height={36} />
                </div>
                <div className={s.profile__email}>
                    <Skeleton width={200} height={36} />
                </div>
                <div className={s.profile__descr}>
                    <Skeleton width={200} height={40} />
                </div>
                <div className={s.buttons}>
                    <Skeleton width={60} height={30} />
                    <Skeleton width={60} height={30} />
                </div>
            </div>
        </div>
    </div>
);

export default Profile;
