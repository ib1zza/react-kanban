import Button from 'shared/ui/Button/Button';

import Skeleton from 'react-loading-skeleton';

import s from './Profile.module.scss';

const Profile = () => (
    <div>
        <div className={s.profile}>
            <Skeleton circle height={90} width={90} />
            <div>
                <div className={s.profile__name}>
                    <Skeleton width={140} />
                </div>
                <div className={s.profile__email}>
                    <Skeleton width={200} />
                </div>
                <div>
                    <Skeleton width={200} />
                </div>
                <Button>
                    <Skeleton width={60} />
                </Button>
            </div>
        </div>
    </div>
);

export default Profile;
