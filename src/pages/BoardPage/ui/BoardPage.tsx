import React, {
    memo, Suspense, useCallback, useEffect,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PopupTaskInfo } from 'widgets';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import {
    BoardPageHeader, deleteBoard, editBoard, ShareBoard,
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
        deleteBoard(selectedBoard).then(() => {
            navigate('/');
        });
    }, [selectedBoard]);

    useEffect(() => () => {
        dispatch(boardCollectionActions.removeSelectedBoard());
    }, [dispatch]);

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
                                            controlsDisabled={userRole !== LinkedUserType.USER}

                                        />
                                    ))}
                                    {userRole === LinkedUserType.USER && <AddColumn />}
                                </>
                            )}

                    </div>
                    <Suspense>
                        {selectedTask && (
                            <PopupTaskInfo
                                selectedTask={selectedTask}
                                controlsDisabled={userRole !== LinkedUserType.USER}
                            />
                        )}
                    </Suspense>
                </div>

            </div>
        </>
    );
});

export default BoardPage;
