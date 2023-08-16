import React, { useEffect } from 'react';
import { faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { IBoard } from 'app/types/IBoard';
import { deleteBoard, ShareBoard } from 'features/boards';
import { getUserInfo } from 'features/users';

import Modal from 'shared/ui/Modal/Modal';
import Button from 'shared/ui/Button/Button';
import s from './BoardPreview.module.scss';

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
        getUserInfo(board.ownerId).then((res: { displayName: React.SetStateAction<string>; }) => {
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
                    // eslint-disable-next-line react/no-children-prop
                    children={<ShareBoard board={board} />}
                />
            )}
            <h3 className={s.heading}>
                {/* <span onClick={onClick}>{board.title.slice(0, 5)}</span> */}
                <span className={s.title} onClick={onClick}>{board.title.slice(0)}</span>
                {userId === board.ownerId && (
                    <div className={s.buttons}>
                        <Button
                            onClick={onOpenShare}
                            style={{ marginRight: '5px' }}
                            icon={<FontAwesomeIcon icon={faLink} />}
                        />
                        <Button
                            onClick={handleDelete}
                            icon={<FontAwesomeIcon icon={faTrash} style={{ color: '#e32400' }} />}
                        />
                    </div>
                )}
            </h3>
            <p>
                by
                {' '}
                {username || `${t('Загрузка')}`}
            </p>
        </div>
    );
};

export default BoardPreview;
