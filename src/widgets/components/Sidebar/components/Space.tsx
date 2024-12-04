import { classNames } from 'shared/lib/classNames/classNames';
import { IUserInfo } from 'app/types/IUserInfo';
import { Avatar } from 'shared/ui/Avatar';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/providers/StoreProvider';
import { getLinkedUsers } from 'pages/BoardPage';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import s from './Space.module.scss';

interface SpaceProps {
    className?: string
}
const Space = ({ className } : SpaceProps) => {
    const { t } = useTranslation();
    const linkedUsers = useAppSelector(getLinkedUsers);

    return (
        <div className={classNames(s.Space, {}, [className])}>
            <div className={s.title}>
                <MemoizedFontAwesomeIcon icon={faPeopleGroup} className={s.svg} />
                <span>{t('My space')}</span>
            </div>
            {
                linkedUsers.length > 0 && (
                    <div className={s.linkedUsers}>
                        {linkedUsers.map((user: IUserInfo) => (
                            <div key={user.uid} className={s.space_member}>
                                <Avatar className={s.userAvatar} src={user.photoURL} alt={user.displayName} />
                                <p className={s.userName}>{user.displayName}</p>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Space;
