import React, { memo, useEffect, useState } from 'react';
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
        selectedBoard, selectedTask, linkedUsersInfo,
    } = useAppSelector(
        getBoardCollection,
    );
    const [shareStatus, setShareStatus] = useState(false);
    const { user } = useAppSelector(getUserState);
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const refetchBoard = async () => {
    //     const board = await getBoardFromId(boardId as string);
    //     if (board) {
    //         dispatch(boardCollectionActions.setCurrentBoard(board));

    //         const usersIds = board.usersAllowed.concat(board.guestsAllowed);
    //         const usersInfo = await Promise.allSettled(
    //             usersIds.map((userId) => getUserInfo(userId)),
    //         );

    //         dispatch(boardCollectionActions.setLinkedUsers(usersInfo.reduce((acc, el) => {
    //             if (el.status === 'fulfilled') {
    //                 acc.push(el.value);
    //             }
    //             return acc;
    //         }, [] as IUserInfo[])));
    //     }
    // };

    //  useEffect(() => {
    // refetchBoard();
    // }, [boardId]);

    const refetchTask = async () => {
        if (!selectedTask) return;
        // const res = await getTaskInfo(boardId, selectedColumnId, selectedTask.uid);
        dispatch(boardCollectionActions.updateSelectedTask(selectedTask.uid));
    };

    const createColumnAction = async (title: string, color: string) => {
        if (!boardId) return;
        setIsCreating(false);
        await createColumnRt(title, color || '#808080', boardId);
        // refetchBoard();
    };

    const handleDeleteTask = () => {
        dispatch(boardCollectionActions.removeSelectedTask());
        // refetchBoard();
    };

    const handleEditTitle = (newTitle: string) => {
        if (!boardId) return;
        editBoard(boardId, { title: newTitle });
        // .then(refetchBoard);
    };

    useEffect(() => {
        if (!boardId) return;
        dispatch(getBoardThunk({ boardId, linkedUsersInfo }));
    }, [boardId, dispatch, linkedUsersInfo]);

    const handleDeleteBoard = async () => {
        if (!boardId || !user?.uid) return;

        deleteBoard(boardId, user.uid).then((res) => {
            navigate('/');
        });
        // await dispatch(boardCollectionActions.removeBoard(boardId));
        // window.location.href = '/';
    };

    return (
        <>

            {selectedBoard && shareStatus && (
                <Modal
                    onClose={() => setShareStatus(false)}
                >
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
                    onShare={() => setShareStatus(true)}
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
                                            // onEdit={refetchBoard}
                                            onEdit={() => {}}
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
