import React, {
    Suspense,
    memo, useCallback, useEffect, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PopupTaskInfo } from 'widgets';
import {
    useAppDispatch,
    useAppSelector,
} from 'app/providers/StoreProvider';
import {
    editBoard, BoardPageHeader, deleteBoard, ShareBoard,
} from 'features/boards';
import { TaskColumn } from 'entities/Column';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';
import { createColumnRt } from 'features/columns/API/createColumn/createColumnRt';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';
import Modal from 'shared/ui/Modal/Modal';
import Loader from 'shared/ui/Loader/Loader';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { getColumnsFromBoard } from '../lib/getColumnsFromBoard';
import s from './BoardPage.module.scss';
import { boardCollectionActions, getBoardCollection } from '..';
import { getBoardThunk } from '../model/services/getBoardThunk/getBoardThunk';

const BoardPage = memo(() => {
    const { boardId } = useParams();
    const {
        selectedBoard, selectedTask, linkedUsersInfo, shareStatus, isCreatingColumn,
    } = useAppSelector(
        getBoardCollection,
    );
    const { user } = useAppSelector(getUserState);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const refetchTask = useCallback(
        async () => {
            if (!selectedTask) return;

            dispatch(boardCollectionActions.updateSelectedTask(selectedTask.uid));
        },
        [dispatch, selectedTask],
    );

    const createColumnAction = useCallback(
        async (title: string, color: string) => {
            if (!boardId) return;
            handleCreateColumnCancel();
            await createColumnRt(title, color || '#808080', boardId);
        },
        [boardId],
    );

    const handleDeleteTask = useCallback(() => {
        dispatch(boardCollectionActions.removeSelectedTask());
    }, [dispatch]);

    const handleEditTitle = useCallback((newTitle: string) => {
        if (!boardId) return;
        console.log(boardId, newTitle);
        editBoard(boardId, { title: newTitle });
    }, [boardId]);

    useEffect(() => {
        if (!boardId) return;
        dispatch(getBoardThunk({ boardId, linkedUsersInfo }));
    }, [boardId, dispatch, linkedUsersInfo]);

    const handleDeleteBoard = useCallback(async () => {
        if (!selectedBoard) return;
        deleteBoard(selectedBoard).then(() => {
            navigate('/');
        });
    }, [selectedBoard, boardId, navigate, user?.uid]);

    function handleCreateColumnClick() {
        dispatch(boardCollectionActions.setIsCreatingColumn(true));
    }

    function handleCreateColumnCancel() {
        dispatch(boardCollectionActions.setIsCreatingColumn(false));
    }

    return (
        <>
            {selectedBoard && shareStatus && (
                <Modal onClose={() => dispatch(boardCollectionActions.setShareStatus(false))}>
                    <ShareBoard board={selectedBoard} />
                </Modal>
            )}
            <div className={s.wrapperContainer}>
                <BoardPageHeader
                    onEdit={handleEditTitle}
                    title={selectedBoard?.title || 'loading...'}
                    onDelete={handleDeleteBoard}
                />
                <div className={s.wrapper}>
                    <div className={s.columnsWrapper}>
                        {!selectedBoard
                            ? <><Loader /></>
                            : (
                                <>
                                    {getColumnsFromBoard(selectedBoard).map((column) => (
                                        <TaskColumn
                                            key={column.uid}
                                            column={column}
                                            boardId={selectedBoard.uid}
                                        />
                                    ))}
                                    {!isCreatingColumn && (
                                        <div className={s.addColumn}>
                                            <Button
                                                className={s.add}
                                                onClick={handleCreateColumnClick}
                                                theme={ButtonTheme.ACCENT}
                                                icon={faAdd}
                                            >
                                                <p>{t('add')}</p>
                                            </Button>
                                        </div>
                                    )}
                                    <Suspense>
                                        {isCreatingColumn && (
                                            <ActionForm
                                                status={ActionFormStatus.COLUMN}
                                                onCreateColumn={createColumnAction}
                                                onAbort={handleCreateColumnCancel}
                                            />
                                        )}
                                    </Suspense>
                                </>
                            )}

                    </div>
                    <Suspense>
                        {selectedTask && (
                            <PopupTaskInfo onEdit={refetchTask} onDelete={handleDeleteTask} />
                        )}
                    </Suspense>
                </div>

            </div>
        </>
    );
});

export default BoardPage;
