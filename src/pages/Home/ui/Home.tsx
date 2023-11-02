import React, {
    Suspense,
    memo,
    useCallback,
    useEffect,
} from 'react';
import { addUserToBoard } from 'features/boards';
import { IBoard, LinkedUserType } from 'app/types/IBoard';
import { BoardPreview } from 'entities/Board';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';
import { createBoardRt } from 'features/boards/API/createBoard/createBoardRealtime';
import { subscribeToUserBoards } from 'pages/Home/model/services/subscribeToUserBoards';
import { getBoardsRt } from 'pages/Home/model/services/getBoardsRt';
import Loader from 'shared/ui/Loader/Loader';
import { homeActions } from '../model/slice/HomeSlice';
import { getHomeBoards } from '../model/selectors/getHomeBoards';
import s from './Home.module.scss';
import { getAddBoardStatus, getLinkBoardStatus } from '../model/selectors/getButtonStatus';
import HomeHeader from './HomeHeader';

const Home = memo(() => {
    const { user } = useAppSelector((state) => state.userInfo);
    const addBoardStatus = useAppSelector(getAddBoardStatus);
    const linkBoardStatus = useAppSelector(getLinkBoardStatus);
    const boards = useAppSelector(getHomeBoards);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!user?.uid) return;
        const unsub = subscribeToUserBoards(
            user.uid,
            (data) => {
                if (data) {
                    getBoardsRt(Object.keys(data)).then((res) => {
                        if (res) {
                            dispatch(homeActions.addBoards(Object.values(res)));
                        }
                    });
                }
            },
        );
        return () => {
            unsub();
        };
    }, [dispatch, user?.uid]);

    const handleCreateBoard = useCallback(
        async (title: string) => {
            dispatch(homeActions.setAddBoardStatus(false));
            await createBoardRt(title, user?.uid as string);
        },
        [dispatch, user?.uid],
    );

    const handleLinkBoard = useCallback(
        async (id: string) => {
            dispatch(homeActions.setAddBoardStatus(false));
            await addUserToBoard(id, user?.uid as string, LinkedUserType.USER);
        },
        [dispatch, user?.uid],
    );
    return (
        <div className={s.boardPageContainer}>
            <HomeHeader />
            <div className={s.blocks__container}>
                {!user?.uid ? <Loader /> : (
                    <>
                        <Suspense>
                            {addBoardStatus && (
                                <ActionForm
                                    status={ActionFormStatus.BOARD}
                                    onCreateBoard={handleCreateBoard}
                                    onAbort={() => dispatch(homeActions.setAddBoardStatus(false))}
                                />
                            )}
                        </Suspense>
                        <Suspense>
                            {linkBoardStatus && (
                                <ActionForm
                                    status={ActionFormStatus.BOARD}
                                    onCreateBoard={handleLinkBoard}
                                    onAbort={() => dispatch(homeActions.setLinkBoardStatus(false))}
                                />
                            )}
                        </Suspense>
                        <Suspense>
                            { boards.map((item: IBoard) => (
                                <BoardPreview
                                    key={item.uid}
                                    board={item}
                                    userId={user.uid}
                                />
                            ))}
                        </Suspense>
                    </>
                )}
            </div>

        </div>

    );
});

export default Home;
