import React, {
    Suspense,
    memo,
    useCallback,
    useEffect,
} from 'react';
import {addUserToBoard} from 'features/boards';
import {LinkedUserType} from 'app/types/IBoardFromServer';
import {BoardPreview, mapBoardFromServer} from 'entities/Board';
import {useAppDispatch, useAppSelector} from 'app/providers/StoreProvider';
import ActionForm, {ActionFormStatus} from 'shared/ui/ActionForm/ui/ActionForm';
import {createBoardRt} from 'features/boards/API/createBoard/createBoardRealtime';
import {subscribeToUserBoards} from 'pages/Home/model/services/subscribeToUserBoards';
import {getBoardsRt} from 'pages/Home/model/services/getBoardsRt';
import Loader from 'shared/ui/Loader/Loader';
import {homeActions} from '../model/slice/HomeSlice';
import {getHomeBoards} from '../model/selectors/getHomeBoards';
import s from './Home.module.scss';
import {getAddBoardStatus, getLinkBoardStatus} from '../model/selectors/getButtonStatus';
import HomeHeader from './HomeHeader';
import {motion} from "framer-motion";

const Home = memo(() => {
    const {user} = useAppSelector((state) => state.userInfo);
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
                            dispatch(homeActions.addBoards(res.map(mapBoardFromServer)));
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
            <HomeHeader/>
            {!user?.uid  ? <Loader/> : (
                <>
                    <Suspense>


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
                        {
                            boards.length > 0 && <motion.div className={s.blocks__container}
                                                         variants={{
                                                             visible: {
                                                                 transition: {
                                                                     staggerChildren: 0.1
                                                                 }
                                                             }
                                                         }}
                                                         initial="hidden"
                                                         animate="visible"
                            >
                                {boards.map((item) => (
                                    <BoardPreview
                                        key={item.uid}
                                        board={item}
                                        userId={user.uid}
                                    />
                                ))}
                            </motion.div>
                        }

                    </Suspense>
                </>
            )}

        </div>

    );
});

export default Home;
