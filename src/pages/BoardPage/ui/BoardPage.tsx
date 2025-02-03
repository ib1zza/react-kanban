import React, {
    memo, Suspense, useCallback, useEffect, useMemo,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PopupTaskInfo } from 'widgets';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import {
    BoardPageHeader, deleteBoardRt, editBoard, ShareBoard,
} from 'features/boards';
import { TaskColumn } from 'entities/Column';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';
import Modal from 'shared/ui/Modal/Modal';
import Loader from 'shared/ui/Loader/Loader';
import { useUserRole } from 'features/boards/hooks/useUserRole';
import { AddColumn } from 'features/columns/ui/AddColumn/AddColumn';
import { LinkedUserType } from 'app/types/IBoardFromServer';
import { subscribeToBoardById } from 'entities/Board/API/getBoardFromIdRt';
import { mapBoardFromServer } from 'entities/Board';
import { AnimatePresence, motion } from 'framer-motion';
import { connectToBoardRt } from 'features/boards/API/joinBoard';
import { errorActions } from 'entities/Error/model/slice/ErrorSlice';
import { boardCollectionActions, getBoardCollection } from '..';
import s from './BoardPage.module.scss';

const BoardPage = memo(() => {
    const { boardId } = useParams();
    const {
        selectedBoard, selectedTask, shareStatus,
    } = useAppSelector(
        getBoardCollection,
    );

    const userRole = useUserRole();
    const { user } = useAppSelector(getUserState);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleEditTitle = useCallback((newTitle: string) => {
        if (!boardId) return;
        console.log(boardId, newTitle);
        editBoard(boardId, { title: newTitle });
    }, [boardId]);

    useEffect(() => {
        if (!boardId) return;

        let unsubscribe: () => void = () => {};

        async function connectToBoard() {
            if (!boardId || !user?.uid) return;

            const res = await connectToBoardRt(user.uid, boardId);
            console.log(res);
            if (res) {
                unsubscribe = subscribeToBoardById(boardId, (board) => {
                    dispatch(boardCollectionActions.setCurrentBoard(mapBoardFromServer(board)));
                });
            } else {
                dispatch(errorActions.setError('Board not found or private'));
            }
        }

        connectToBoard();

        // Cleanup function to unsubscribe when the component unmounts or boardId changes
        return () => {
            unsubscribe();
        };
    }, [boardId, dispatch, user?.uid]);

    const handleDeleteBoard = useCallback(async () => {
        if (!selectedBoard) return;
        deleteBoardRt(selectedBoard).then(() => {
            navigate('/');
        });
    }, [selectedBoard]);

    useEffect(() => () => {
        dispatch(boardCollectionActions.removeSelectedBoard());
    }, [dispatch]);

    const controlsDisabled = useMemo(() => userRole !== LinkedUserType.USER, [userRole]);

    return (
        <>
            {selectedBoard && shareStatus && (
                <Modal onClose={() => dispatch(boardCollectionActions.setShareStatus(false))}>
                    <ShareBoard board={selectedBoard} />
                </Modal>
            )}
            <div className={s.wrapperContainer}>
                {selectedBoard && (
                    <BoardPageHeader
                        onEdit={handleEditTitle}
                        board={selectedBoard}
                        onDelete={handleDeleteBoard}
                    />
                )}
                <div className={s.wrapper}>

                    {!selectedBoard
                        ? <><Loader /></>
                        : (
                            <motion.div
                                variants={{
                                    visible: {
                                        transition: { staggerChildren: 0.1 },
                                    },
                                }}
                                initial="hidden"
                                animate="visible"
                                className={s.columnsWrapper}
                                layout
                            >
                                {selectedBoard.columns.map((column, index) => (
                                    <TaskColumn
                                        key={column.uid}
                                        column={column}
                                        boardId={selectedBoard.uid}
                                        controlsDisabled={controlsDisabled}
                                        canMoveLeft={index !== 0}
                                        canMoveRight={index !== selectedBoard.columns.length - 1}
                                    />
                                ))}
                                {!controlsDisabled && <AddColumn key="addColumn" />}
                            </motion.div>
                        )}
                    <AnimatePresence>

                        {selectedTask && (
                            <Suspense>
                                <PopupTaskInfo
                                    selectedTask={selectedTask}
                                    controlsDisabled={controlsDisabled}
                                />
                            </Suspense>
                        )}
                    </AnimatePresence>

                </div>

            </div>
        </>
    );
});

export default BoardPage;
