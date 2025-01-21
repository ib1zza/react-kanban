import React, {
    Suspense,
    memo,
    useCallback,
    useEffect,
} from 'react';
import { BoardPreview, mapBoardFromServer } from 'entities/Board';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';
import { createBoardRt } from 'features/boards';
import { subscribeToUserBoards } from 'pages/Home/model/services/subscribeToUserBoards';
import { getBoardsRt } from 'pages/Home/model/services/getBoardsRt';
import Loader from 'shared/ui/Loader/Loader';
import { motion } from 'framer-motion';
import BoardPreviewSkeleton from 'entities/Board/ui/BoardPreviewSkeleton';
import Modal from 'shared/ui/Modal/Modal';
import ProfileSkeleton from 'features/Profile/ui/ProfileSkeleton';
import { Profile } from 'features/Profile';
import ActionFormCreateBoard from 'shared/ui/ActionForm/ui/ActionFormCreateBoard';
import { useTranslation } from 'react-i18next';
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
            // TODO: add user
            // await addUserToBoard(id, user?.uid as string, LinkedUserType.USER);
        },
        [dispatch, user?.uid],
    );

    const Loader = (
        <div className={s.blocks__container}>
            {[1, 2, 3].map((el) => (
                <BoardPreviewSkeleton
                    key={`skeleton${el}`}
                />
            ))}
        </div>
    );

    const { t } = useTranslation();

    return (
        <div className={s.boardPageContainer}>
            <HomeHeader />
            {!user?.uid ? Loader : (
                <>
                    <Suspense fallback={Loader}>

                        {addBoardStatus && (
                            <Modal
                                title={t('Создать доску')}
                                onClose={() => dispatch(homeActions.setAddBoardStatus(false))}
                            >
                                <ActionFormCreateBoard
                                    onCreate={handleCreateBoard}
                                />
                                {/* <ActionForm */}
                                {/*    status={ActionFormStatus.BOARD} */}
                                {/*    onCreateBoard={handleCreateBoard} */}
                                {/*    onAbort={() => dispatch(homeActions.setAddBoardStatus(false))} */}
                                {/* /> */}
                            </Modal>
                        )}
                        {linkBoardStatus && (
                            <ActionForm
                                status={ActionFormStatus.BOARD}
                                onCreateBoard={handleLinkBoard}
                                onAbort={() => dispatch(homeActions.setLinkBoardStatus(false))}
                            />
                        )}
                        {
                            boards.length > 0 && (
                                <motion.div
                                    className={s.blocks__container}
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                            },
                                        },
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
                            )
                        }

                    </Suspense>
                </>
            )}

        </div>

    );
});

export default Home;
