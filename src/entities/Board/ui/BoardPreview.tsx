import React, {memo, useCallback, useEffect} from 'react';
import {faLink, faShareFromSquare, faShareNodes} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';
import {IBoardSmallInfo} from 'app/types/IBoard';
import {ShareBoard} from 'features/boards';
import Modal from 'shared/ui/Modal/Modal';
import Button from 'shared/ui/Button/Button';
import {useNavigate} from 'react-router-dom';
import s from './BoardPreview.module.scss';
import {Avatar, AvatarSize} from "shared/ui/Avatar";
import {useUserInfo} from "features/users/hooks/useUserInfo";

interface IBoardPreviewProps {
  userId: string;
  board: IBoardSmallInfo;
}

const BoardPreview: React.FC<IBoardPreviewProps> = memo(({
    userId,
    board,
}) => {
    const navigate = useNavigate();
    const [isSharing, setIsSharing] = React.useState(false);
    const { t } = useTranslation('');
    const [assignedUserInfo] = useUserInfo(board.ownerId);
    const onClick = useCallback(() => {
        navigate(`/board/${board.uid}`);
    }, [board.uid, navigate]);


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
            <div className={s.heading}>
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
                        icon={faShareNodes}
                    />
                )}
            </div>

        </div>
    );
});

export default BoardPreview;
