/* eslint-disable react/display-name */
import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import s from './BoardPage.module.scss';
import TaskColumn from '../../../entities/Column/ui/TaskColumn';
import Button from '../../../shared/ui/Button/Button';
import { FormToCreate } from '../../../shared/ui/FormToCreate';
import { createColumn } from '../../../features/columns';
import { PopupTaskInfo } from '../../../widgets';
import {
    removeSelectedTask,
    setCurrentBoard,
    setCurrentTask,
} from '../../../app/providers/store/Reducers/boardCollectionSlice';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../app/providers/store/store';

import { getTaskInfo } from '../../../features/tasks';
import { editBoard, BoardPageHeader } from '../../../features/boards';
import { getBoardFromId } from '../../../entities/Board';
import { getColumnsFromBoard } from '../lib/getColumnsFromBoard';
import { FormToLink } from '../../../shared/ui/FormToLink';

const BoardPage: React.FC = memo(() => {
    const { boardId } = useParams();
    const { selectedBoard, selectedTask, selectedColumnId } = useAppSelector(
        (state) => state.boardCollection,
    );
    const [isCreating, setIsCreating] = useState(false);
    const [isLinking, setIsLinking] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(boardId);
        refetchBoard();
    }, [boardId]);

    const refetchBoard = async () => {
        const board = await getBoardFromId(boardId as string);
        if (board) {
            dispatch(setCurrentBoard(board));
        }
    };

    const refetchTask = async () => {
        if (!boardId || !selectedColumnId || !selectedTask) return;
        const res = await getTaskInfo(boardId, selectedColumnId, selectedTask.uid);
        dispatch(setCurrentTask(res));
    };

    const createColumnAction = async (title: string, color: string) => {
        if (!boardId) return;
        await createColumn(title, color, boardId);
        setIsCreating(false);
        refetchBoard();
    };

    const handleDeleteTask = () => {
        dispatch(removeSelectedTask());
        refetchBoard();
    };

    const handleEditTitle = (newTitle: string) => {
        if (!boardId) return;
        editBoard(boardId, { title: newTitle }).then(refetchBoard);
    };

    if (!selectedBoard) return <></>;

    console.log(selectedBoard.title);
    return (
        <div className={s.wrapperContainer}>
            <BoardPageHeader onEdit={handleEditTitle} title={selectedBoard.title} />

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
                        <FormToCreate
                            forColumn
                            onCreateColumn={createColumnAction}
                            onAbort={() => setIsCreating(false)}
                        />
                    )}
                    {isLinking && (
                        <FormToLink
                            forColumn
                            onCreateColumn={() => 1}
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
                {selectedTask && (
                    <PopupTaskInfo onEdit={refetchTask} onDelete={handleDeleteTask} />
                )}
            </div>
        </div>
    );
});

export default BoardPage;
