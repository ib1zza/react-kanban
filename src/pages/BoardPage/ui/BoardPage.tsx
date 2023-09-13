import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createColumn } from 'features/columns';
import { PopupTaskInfo } from 'widgets';

import {
    useAppDispatch,
    useAppSelector,
} from 'app/providers/StoreProvider';

import { getTaskInfo } from 'features/tasks';
import { editBoard, BoardPageHeader } from 'features/boards';
import { TaskColumn } from 'entities/Column';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';
import { getUserInfo } from 'features/users';
import { IUserInfo } from 'app/types/IUserInfo';
import { getBoardFromId } from 'entities/Board';
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
    const [isCreating, setIsCreating] = useState(false);
    const [isLinking, setIsLinking] = useState(false);
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
        await createColumn(title, color || '#808080', boardId);
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

    if (!selectedBoard) return <BoardPageSkeleton />;

    return (
        <div className={s.wrapperContainer}>
            <BoardPageHeader
                onEdit={handleEditTitle}
                title={selectedBoard.title}
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
                    {isLinking && (
                        <ActionForm
                            status={ActionFormStatus.COLUMN}
                            onCreateColumn={() => {
                                // TODO: LINKCOLUMN
                            }}
                            onAbort={() => setIsLinking(false)}
                        />
                    )}
                </div>
                {!isCreating && (
                    <div className={s.buttons}>
                        <Button onClick={() => setIsCreating(true)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                )}
                {/* {!isLinking && (
                    <div className={s.buttons}>
                        <Button onClick={() => setIsCreating(true)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                )} */}

                {selectedTask && (
                    <PopupTaskInfo onEdit={refetchTask} onDelete={handleDeleteTask} />
                )}
            </div>
        </div>
    );
});

export default BoardPage;
