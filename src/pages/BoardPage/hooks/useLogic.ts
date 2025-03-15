import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { boardCollectionActions, getBoardCollection } from 'pages/BoardPage';
import { useUserRole } from 'features/boards/hooks/useUserRole';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';
import { useCallback, useEffect, useMemo } from 'react';
import { deleteBoardRt, editBoard } from 'features/boards';
import { connectToBoardRt } from 'features/boards/API/joinBoard';
import { subscribeToBoardById } from 'entities/Board/API/getBoardFromIdRt';
import { mapBoardFromServer } from 'entities/Board';
import { errorActions } from 'entities/Error/model/slice/ErrorSlice';
import { LinkedUserType } from 'app/types/IBoardFromServer';

export const useLogic = () => {
    const { boardId } = useParams();
    const {
        selectedBoard, selectedTask,
    } = useAppSelector(
        getBoardCollection,
    );

    const userRole = useUserRole();
    const { user } = useAppSelector(getUserState);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleEditTitle = useCallback((newTitle: string) => {
        if (!boardId) return;
        editBoard(boardId, { title: newTitle });
    }, [boardId]);

    useEffect(() => {
        if (!boardId) return;

        let unsubscribe: () => void = () => {};

        async function connectToBoard() {
            if (!boardId || !user?.uid) return;

            const res = await connectToBoardRt(user.uid, boardId);
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

    return {
        boardId,
        selectedBoard,
        selectedTask,
        handleEditTitle,
        handleDeleteBoard,
        controlsDisabled,
    };
};
