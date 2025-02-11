import React, { memo, useCallback } from 'react';
import Modal from 'shared/ui/Modal/Modal';
import { homeActions } from 'pages/Home/model/slice/HomeSlice';
import ActionFormAddBoard from 'shared/ui/ActionForm/ui/ActionFormAddBoard';
import { useTranslation } from 'react-i18next';
import { joinBoardRt } from 'features/boards/API/joinBoard';
import { errorActions } from 'entities/Error/model/slice/ErrorSlice';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';

const ModalLinkBoard = () => {
    const { t } = useTranslation();
    const { user } = useAppSelector((state) => state.userInfo);

    const linkBoardStatus = useAppSelector((state) => state.home.linkBoardStatus);

    const dispatch = useAppDispatch();

    const handleLinkBoard = useCallback(
        async (id: string) => {
            dispatch(homeActions.setAddBoardStatus(false));
            // TODO: add user
            const res = await joinBoardRt(user?.uid as string, id);

            if (!res) {
                dispatch(errorActions.setError('Не удалось присоединиться к доске'));
            } else {
                dispatch(homeActions.setLinkBoardStatus(false));
            }
        },
        [dispatch, user?.uid],
    );
    return (
        linkBoardStatus ? (
            <Modal
                title={t('Присоединиться к доске')}
                onClose={() => dispatch(homeActions.setLinkBoardStatus(false))}
            >
                <ActionFormAddBoard
                    onSubmit={handleLinkBoard}
                    label={t('Введите ccылку')}
                />
            </Modal>
        ) : null
    );
};

export default memo(ModalLinkBoard);
