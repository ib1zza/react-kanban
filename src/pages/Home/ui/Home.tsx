import React, {
    memo,
    useCallback,
    useEffect,
} from 'react';

import { addUserToBoard } from 'features/boards';
import { IBoard, LinkedUserType } from 'app/types/IBoard';
import { BoardPreview } from 'entities/Board';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';
import { useTranslation } from 'react-i18next';
import { createBoardRt } from 'features/boards/API/createBoard/createBoardRealtime';
import { subscribeToUserBoards } from 'pages/Home/model/services/subscribeToUserBoards';
import { getBoardsRt } from 'pages/Home/model/services/getBoardsRt';
import BoardPreviewSkeleton from 'entities/Board/ui/BoardPreviewSkeleton';
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
    }, [user?.uid]);

    const { t } = useTranslation('buttons');
    const handleCreateBoard = useCallback(
        async (title: string) => {
            dispatch(homeActions.setAddBoardStatus(false));
            await createBoardRt(title, user?.uid as string);
        },
        [user?.uid],
    );

    const handleLinkBoard = useCallback(
        async (id: string) => {
            dispatch(homeActions.setAddBoardStatus(false));
            await addUserToBoard(id, user?.uid as string, LinkedUserType.USER);
        },
        [user?.uid],
    );
    return (
        <div className={s.boardPageContainer}>
            <HomeHeader />

            <div className={s.blocks__container}>
                {!user?.uid ? <BoardPreviewSkeleton /> : (
                    <>
                        {addBoardStatus && (
                            <ActionForm
                                status={ActionFormStatus.BOARD}
                                onCreateBoard={handleCreateBoard}
                                onAbort={() => dispatch(homeActions.setAddBoardStatus(false))}
                            />
                        )}
                        {linkBoardStatus && (
                            <ActionForm
                                status={ActionFormStatus.BOARD}
                                onCreateBoard={handleLinkBoard}
                                onAbort={() => dispatch(homeActions.setLinkBoardStatus(false))}
                            />
                        )}
                        { boards.map((item: IBoard) => (
                            <BoardPreview
                                key={item.uid}
                                board={item}
                                userId={user.uid}
                            />
                        ))}
                    </>
                )}

            </div>

        </div>

    );
});

export default Home;
