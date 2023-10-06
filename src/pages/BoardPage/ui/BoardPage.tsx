import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PopupTaskInfo } from 'widgets';

import {
    useAppDispatch,
    useAppSelector,
} from 'app/providers/StoreProvider';

import { getTaskInfo } from 'features/tasks';
import { editBoard, BoardPageHeader, deleteBoard } from 'features/boards';
import { TaskColumn } from 'entities/Column';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';
import { getUserInfo } from 'features/users';
import { IUserInfo } from 'app/types/IUserInfo';
import { getBoardFromId } from 'entities/Board';
import { subscribeToBoardById } from 'entities/Board/API/getBoardFromIdRt';
import { createColumnRt } from 'features/columns/API/createColumn/createColumnRt';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';

import { getColumnsFromBoard } from '../lib/getColumnsFromBoard';
import s from './BoardPage.module.scss';
import Button from '../../../shared/ui/Button/Button';
import BoardPageSkeleton from './BoardPageSkeleton';
import { boardCollectionActions, getBoardCollection } from '..';

const BoardPage = memo(() => {
    const { boardId } = useParams();
    const { selectedBoard, selectedTask, selectedColumnId } = useAppSelector(
        getBoardCollection,
    );
    const { user } = useAppSelector(getUserState);
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const refetchBoard = async () => {
        const board = await getBoardFromId(boardId as string);
        if (board) {
            dispatch(boardCollectionActions.setCurrentBoard(board));

            const usersIds = board.usersAllowed.concat(board.guestsAllowed);
            const usersInfo = await Promise.allSettled(
                usersIds.map((userId) => getUserInfo(userId)),
            );

            dispatch(boardCollectionActions.setLinkedUsers(usersInfo.reduce((acc, el) => {
                if (el.status === 'fulfilled') {
                    acc.push(el.value);
                }
                return acc;
            }, [] as IUserInfo[])));
        }
    };

    useEffect(() => {
        refetchBoard();
    }, [boardId]);

    const refetchTask = async () => {
        if (!boardId || !selectedColumnId || !selectedTask) return;
        const res = await getTaskInfo(boardId, selectedColumnId, selectedTask.uid);
        dispatch(boardCollectionActions.updateSelectedTask(res));
    };

    const createColumnAction = async (title: string, color: string) => {
        if (!boardId) return;
        await createColumnRt(title, color || '#808080', boardId);
        setIsCreating(false);
        refetchBoard();
    };

    const handleDeleteTask = () => {
        dispatch(boardCollectionActions.removeSelectedTask());
        refetchBoard();
    };

    const handleEditTitle = (newTitle: string) => {
        if (!boardId) return;
        editBoard(boardId, { title: newTitle }).then(refetchBoard);
    };

    useEffect(() => {
        if (!boardId) return;

        const unsub = subscribeToBoardById(boardId, (board) => {
            dispatch(boardCollectionActions.setCurrentBoard(board));
            console.log(board);
        });

        return () => {
            unsub();
        };
    }, [boardId, dispatch]);

    const handleDeleteBoard = async () => {
        if (!boardId || !user?.uid) return;

        deleteBoard(boardId, user.uid).then((res) => {
            navigate('/');
        });
        // await dispatch(boardCollectionActions.removeBoard(boardId));
        // window.location.href = '/';
    };

    if (!selectedBoard) return <BoardPageSkeleton />;

    return (
        <div className={s.wrapperContainer}>
            <BoardPageHeader
                onEdit={handleEditTitle}
                title={selectedBoard.title}
                setIsCreating={setIsCreating}
                onDelete={handleDeleteBoard}
            />
            <div className={s.wrapper}>
                <div className={s.columnsWrapper}>
                    {getColumnsFromBoard(selectedBoard).map((column) => (
                        <TaskColumn
                            key={column.uid}
                            column={column}
                            onEdit={refetchBoard}
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
                </div>
                {selectedTask && (
                    <PopupTaskInfo onEdit={refetchTask} onDelete={handleDeleteTask} />
                )}
            </div>
        </div>
    );
});

export default BoardPage;
