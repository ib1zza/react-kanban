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
import { boardCollectionActions, getBoardCollection } from '..';
import s from './BoardPage.module.scss';
import { getColumnsFromBoard } from '../lib/getColumnsFromBoard';

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

        // Subscribe to the board and get the unsubscribe function
        const unsubscribe = subscribeToBoardById(boardId, (board) => {
            dispatch(boardCollectionActions.setCurrentBoard(mapBoardFromServer(board)));
        });
        // Cleanup function to unsubscribe when the component unmounts or boardId changes
        return () => {
            unsubscribe();
        };
    }, [boardId, dispatch]);

    const handleDeleteBoard = useCallback(async () => {
        if (!selectedBoard) return;
        deleteBoardRt(selectedBoard).then(() => {
            navigate('/');
        });
    }, [selectedBoard]);

    useEffect(() => () => {
        dispatch(boardCollectionActions.removeSelectedBoard());
    }, [dispatch]);

    // console.log(selectedBoard?.columns.map((c) => ({
    //     title: c.title,
    //     displayId: c.displayIndex,
    // })));
    const controlsDisabled = useMemo(() => userRole !== LinkedUserType.USER, [userRole]);

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
