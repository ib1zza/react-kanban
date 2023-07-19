import React, { useEffect } from 'react';
import { faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import s from './BoardPreview.module.scss';
import { getUserInfo } from '../../../features/users';
import { deleteBoard } from '../../../features/boards';
import Modal from '../../../shared/ui/Modal/Modal';
import ShareBoard from '../../../features/boards/ui/ShareBoard/ShareBoard';
import { IBoard } from '../../../app/types/IBoard';

interface IBoardPreviewProps {
  userId: string;
  board: IBoard;
  onClick: () => void;
  onDelete: () => void;
}

const BoardPreview: React.FC<IBoardPreviewProps> = ({
    userId,
    onClick,
    board,
    onDelete,
}) => {
    const [username, setUsername] = React.useState<string>('');
    const [shareStatus, setShareStatus] = React.useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        getUserInfo(board.ownerId).then((res) => {
            setUsername(res?.displayName);
        });
    }, [userId]);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await deleteBoard(board.uid, board.ownerId);
        onDelete();
    };
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
                    children={<ShareBoard board={board} />}
                />
            )}
            <h3 className={s.heading}>
                <span onClick={onClick}>{board.title}</span>
                {userId === board.ownerId && (
                    <div>
                        <button
                            onClick={onOpenShare}
                            style={{ marginRight: '16px' }}
                        >
                            <FontAwesomeIcon icon={faLink} />
                        </button>
                        <button onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} style={{ color: '#e32400' }} />
                        </button>
                    </div>
                )}
            </h3>
            <p>
                by
                {username || `${t('Загрузка')}`}
            </p>
            {' '}
        </div>
    );
};

export default BoardPreview;
