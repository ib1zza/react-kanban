import React, {memo, Suspense, useCallback, useEffect,} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {PopupTaskInfo} from 'widgets';
import {useAppDispatch, useAppSelector,} from 'app/providers/StoreProvider';
import {BoardPageHeader, deleteBoard, editBoard, ShareBoard,} from 'features/boards';
import {TaskColumn} from 'entities/Column';
import {createColumnRt} from 'features/columns/API/createColumn/createColumnRt';
import {getUserState} from 'features/users/model/selectors/getUserState/getUserState';
import Modal from 'shared/ui/Modal/Modal';
import Loader from 'shared/ui/Loader/Loader';
import {useTranslation} from 'react-i18next';
import {getColumnsFromBoard} from '../lib/getColumnsFromBoard';
import s from './BoardPage.module.scss';
import {boardCollectionActions, getBoardCollection} from '..';
import {getBoardThunk} from '../model/services/getBoardThunk/getBoardThunk';
import {useUserRole} from "features/boards/hooks/useUserRole";
import {AddColumn} from "features/columns/ui/AddColumn/AddColumn";
import {LinkedUserType} from "app/types/IBoard";

const BoardPage = memo(() => {
    const { boardId } = useParams();
    const {
        selectedBoard, selectedTask, linkedUsersInfo, shareStatus,
    } = useAppSelector(
        getBoardCollection,
    );

    const userRole = useUserRole();
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
                                    {userRole === LinkedUserType.USER && <AddColumn/>}
                                </>
                            )}

                    </div>
                    <Suspense>
                        {selectedTask && (
                            <PopupTaskInfo onEdit={refetchTask} onDelete={handleDeleteTask}   controlsDisabled={userRole !== LinkedUserType.USER} />
                        )}
                    </Suspense>
                </div>

            </div>
        </>
    );
});

export default BoardPage;
