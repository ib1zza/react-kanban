import React, { useCallback } from 'react';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { IBoard } from 'app/types/IBoardFromServer';
import { ShareBoard } from 'features/boards';
import Modal from 'shared/ui/Modal/Modal';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarSize } from 'shared/ui/Avatar';
import { useUserInfo } from 'features/users/hooks/useUserInfo';
import { motion } from 'framer-motion';
import s from './BoardPreview.module.scss';

interface IBoardPreviewProps {
    userId: string;
    board: IBoard;
}

const BoardPreview: React.FC<IBoardPreviewProps> = ({
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

    console.log(t('Владелец'));
    return (
        <motion.div
            variants={{
                visible: {
                    opacity: 1,
                    y: 0,
                },
                hidden: {
                    opacity: 0,
                    y: -30,
                },
            }}
            key={board.uid}
            className={s.container}
        >
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
                        <Avatar
                            size={AvatarSize.S}
                            src={assignedUserInfo?.photoURL}
                            alt={assignedUserInfo?.displayName}
                        />
                        {assignedUserInfo?.displayName || `${t('Загрузка')}`}
                    </p>
                </div>
                {userId === board.ownerId && (
                    <Button
                        theme={ButtonTheme.ICON}
                        onClick={onOpenShare}
                        className={s.share_button}
                        icon={faShareNodes}
                    />
                )}
            </div>

        </motion.div>
    );
};

export default BoardPreview;
