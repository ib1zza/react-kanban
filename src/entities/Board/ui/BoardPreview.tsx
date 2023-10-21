/* eslint-disable react/prop-types */
import React, { memo, useEffect } from 'react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { IBoard } from 'app/types/IBoard';
import { ShareBoard } from 'features/boards';
import { getUserInfo } from 'features/users';
import Modal from 'shared/ui/Modal/Modal';
import Button from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import s from './BoardPreview.module.scss';

interface IBoardPreviewProps {
  userId: string;
  board: IBoard;
}

const BoardPreview: React.FC<IBoardPreviewProps> = memo(({
    userId,
    board,
}) => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState<string>('');
    const [shareStatus, setShareStatus] = React.useState(false);
    const { t } = useTranslation();

    const onClick = () => {
        navigate(`/board/${board.uid}`);
    };
    useEffect(() => {
        getUserInfo(board.ownerId).then((res) => {
            setUsername(res?.displayName);
        });
    }, [userId]);

    const onCloseShare = () => {
        setShareStatus(false);
    };
    const onOpenShare = () => {
        setShareStatus(true);
    };
    return (
        <div className={s.container}>
            {shareStatus && (
                <Modal
                    onClose={onCloseShare}
                    title={t('Share board')}
                >
                    <ShareBoard board={board} />
                </Modal>
            )}
            <h3 className={s.heading}>
                {/* <span onClick={onClick}>{board.title.slice(0, 5)}</span> */}
                <div className={s.info}>
                    <span className={s.title} onClick={onClick}>{board.title.slice(0)}</span>
                    <p>
                        by
                        {' '}
                        {username || `${t('Загрузка')}`}
                    </p>
                </div>

                {userId === board.ownerId && (
                    <div className={s.buttons}>
                        <Button
                            onClick={onOpenShare}
                            className={s.share_button}
                            icon={faLink}
                        />
                    </div>
                )}
            </h3>

        </div>
    );
});

export default BoardPreview;
