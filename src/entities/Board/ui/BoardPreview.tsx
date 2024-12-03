/* eslint-disable react/prop-types */
import React, {memo, useCallback, useEffect} from 'react';
import {faLink} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';
import {IBoardSmallInfo} from 'app/types/IBoard';
import {ShareBoard} from 'features/boards';
import {getUserInfo} from 'features/users';
import Modal from 'shared/ui/Modal/Modal';
import Button from 'shared/ui/Button/Button';
import {useNavigate} from 'react-router-dom';
import s from './BoardPreview.module.scss';
import {useAppDispatch, useAppSelector} from "app/providers/StoreProvider";
import {getAllUsers} from "pages/Home/model/selectors/getAllUsers";
import {homeActions} from "pages/Home/model/slice/HomeSlice";
import {IUserInfo} from "app/types/IUserInfo";
import {Avatar, AvatarSize} from "shared/ui/Avatar";

interface IBoardPreviewProps {
  userId: string;
  board: IBoardSmallInfo;
}

const BoardPreview: React.FC<IBoardPreviewProps> = memo(({
    userId,
    board,
}) => {
    const navigate = useNavigate();
    const [assignedUserInfo, setAssignedUserInfo] = React.useState<IUserInfo | null>(null);
    const [isSharing, setIsSharing] = React.useState(false);
    const { t } = useTranslation('');
    const loadedUsers = useAppSelector(getAllUsers);
    const onClick = useCallback(() => {
        navigate(`/board/${board.uid}`);
    }, [board.uid, navigate]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const user = loadedUsers.find((u) => u.uid === board.ownerId);
        if (user) {
            console.log("userfound", user);

            setAssignedUserInfo(user);
        } else {
            getUserInfo(board.ownerId).then((res) => {
                setAssignedUserInfo(res);
                dispatch(homeActions.addUsers(res));
            });
        }
    }, [board.ownerId]);

    const onCloseShare = useCallback(() => {
        setIsSharing(false);
    }, []);

    const onOpenShare = useCallback(() => {
        setIsSharing(true);
    }, []);

    console.log(t('Владелец'))
    return (
        <div className={s.container}>
            {isSharing && (
                <Modal
                    onClose={onCloseShare}
                    title={t('Share board')}
                >
                    <ShareBoard board={board} />
                </Modal>
            )}
            <h3 className={s.heading}>
                <div className={s.info}>
                    <span className={s.title} onClick={onClick}>{board.title.slice(0)}</span>
                    <p className={s.owner}>
                        {t('Владелец')}
                        {' '}
                        <Avatar size={AvatarSize.S} src={assignedUserInfo?.photoURL} alt={assignedUserInfo?.displayName} />
                        {assignedUserInfo?.displayName || `${t('Загрузка')}`}
                    </p>
                </div>
                {userId === board.ownerId && (
                    <Button
                        onClick={onOpenShare}
                        className={s.share_button}
                        icon={faLink}
                    />
                )}
            </h3>

        </div>
    );
});

export default BoardPreview;
