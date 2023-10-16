import { title } from 'process';
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
  // onDelete: () => void;
}

const BoardPreview: React.FC<IBoardPreviewProps> = ({
    userId,
    onClick,
    board,
    // onDelete,
}) => {
    const [username, setUsername] = React.useState<string>('');
    const [shareStatus, setShareStatus] = React.useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        getUserInfo(board.ownerId).then((res) => {
            setUsername(res?.displayName);
        });
    }, [userId]);

    // const handleDelete = async (e: React.MouseEvent) => {
    //     e.stopPropagation();
    //     await deleteBoard(board.uid, board.ownerId);
    //     onDelete();
    // };
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
                            icon={(
                                <FontAwesomeIcon
                                    icon={faLink}
                                />
                            )}
                        />
                        {/* <Button */}
                        {/*    onClick={handleDelete} */}
                        {/*    className={s.delete_button} */}
                        {/*    icon={( */}
                        {/*        <FontAwesomeIcon */}
                        {/*            icon={faTrash} */}
                        {/*        /> */}
                        {/*    )} */}
                        {/* /> */}
                    </div>
                )}
            </h3>

        </div>
    );
};

export default BoardPreview;
