import React, { memo, useCallback } from 'react';
import Modal from 'shared/ui/Modal/Modal';
import { homeActions } from 'pages/Home/model/slice/HomeSlice';
import ActionFormAddBoard from 'shared/ui/ActionForm/ui/ActionFormAddBoard';
import { useTranslation } from 'react-i18next';
import { createBoardRt } from 'features/boards';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { getAddBoardStatus } from 'pages/Home/model/selectors/getButtonStatus';

const ModalCreateBoard = () => {
    const { t } = useTranslation();
    const { user } = useAppSelector((state) => state.userInfo);

    const addBoardStatus = useAppSelector(getAddBoardStatus);
    const dispatch = useAppDispatch();

    const handleCreateBoard = useCallback(
        async (title: string) => {
            dispatch(homeActions.setAddBoardStatus(false));
            await createBoardRt(title, user?.uid as string);
        },
        [dispatch, user?.uid],
    );
    return addBoardStatus ? (
        <Modal
            title={t('Создать доску')}
            onClose={() => dispatch(homeActions.setAddBoardStatus(false))}
        >
            <ActionFormAddBoard
                onSubmit={handleCreateBoard}
                label={t('Введите название')}
            />
        </Modal>
    ) : null;
};

export default memo(ModalCreateBoard);
