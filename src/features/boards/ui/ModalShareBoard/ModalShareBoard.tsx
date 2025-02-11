import React, { memo } from 'react';
import Modal from 'shared/ui/Modal/Modal';
import { boardCollectionActions, getBoardCollection } from 'pages/BoardPage';
import { ShareBoard } from 'features/boards';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';

const ModalShareBoard = () => {
    const {
        selectedBoard, shareStatus,
    } = useAppSelector(
        getBoardCollection,
    );

    const dispatch = useAppDispatch();

    return selectedBoard && shareStatus ? (
        <Modal onClose={() => dispatch(boardCollectionActions.setShareStatus(false))}>
            <ShareBoard board={selectedBoard} />
        </Modal>
    ) : null;
};

export default memo(ModalShareBoard);
