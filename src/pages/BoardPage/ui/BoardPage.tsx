import React, {
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
import TaskColumnSkeleton from 'entities/Column/ui/TaskColumnSkeleton';
import { getColumnsFromBoard } from '../lib/getColumnsFromBoard';
import s from './BoardPage.module.scss';
import { boardCollectionActions, getBoardCollection } from '..';
import { getBoardThunk } from '../model/services/getBoardThunk/getBoardThunk';

const BoardPage = memo(() => {
    const { boardId } = useParams();
    const {
        selectedBoard, selectedTask, linkedUsersInfo, shareStatus,
    } = useAppSelector(
        getBoardCollection,
    );
    const { user } = useAppSelector(getUserState);
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
            setIsCreating(false);
            await createColumnRt(title, color || '#808080', boardId);
        },
        [boardId],
    );

    const handleDeleteTask = useCallback(() => {
        dispatch(boardCollectionActions.removeSelectedTask());
    }, [dispatch]);

    const handleEditTitle = useCallback((newTitle: string) => {
        if (!boardId) return;
        editBoard(boardId, { title: newTitle });
    }, [boardId]);

    useEffect(() => {
        if (!boardId) return;
        dispatch(getBoardThunk({ boardId, linkedUsersInfo }));
    }, [boardId, dispatch, linkedUsersInfo]);

    const handleDeleteBoard = useCallback(async () => {
        if (!boardId || !user?.uid) return;
        deleteBoard(boardId, user.uid).then(() => {
            navigate('/');
        });
    }, [boardId, navigate, user?.uid]);

    return (
        <>
            {selectedBoard && shareStatus && (
                <Modal onClose={() => dispatch(boardCollectionActions.setShareStatus(false))}>
                    <ShareBoard board={selectedBoard} />
                </Modal>
            )}
            <div className={s.wrapperContainer}>
                <BoardPageHeader
                    isEnabled={!selectedBoard && true}
                    onEdit={handleEditTitle}
                    title={selectedBoard?.title || 'loading...'}
                    setIsCreating={setIsCreating}
                    onDelete={handleDeleteBoard}
                />
                <div className={s.wrapper}>
                    <div className={s.columnsWrapper}>
                        {!selectedBoard
                            ? <><TaskColumnSkeleton /></>
                            : (
                                <>
                                    {getColumnsFromBoard(selectedBoard).map((column) => (
                                        <TaskColumn
                                            key={column.uid}
                                            column={column}
                                            boardId={selectedBoard.uid}
                                        />
                                    ))}
                                    {isCreating && (
                                        <ActionForm
                                            status={ActionFormStatus.COLUMN}
                                            onCreateColumn={createColumnAction}
                                            onAbort={() => setIsCreating(false)}
                                        />
                                    )}

                                </>
                            )}

                    </div>
                    {selectedTask && (
                        <PopupTaskInfo onEdit={refetchTask} onDelete={handleDeleteTask} />
                    )}
                </div>
            </div>
        </>
    );
});

export default BoardPage;
