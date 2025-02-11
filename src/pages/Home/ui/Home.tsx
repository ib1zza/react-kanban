import React, {
    Suspense,
    memo,
    useEffect,
} from 'react';
import { BoardPreview, mapBoardFromServer } from 'entities/Board';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { subscribeToUserBoards } from 'pages/Home/model/services/subscribeToUserBoards';
import { getBoardsRt } from 'pages/Home/model/services/getBoardsRt';
import { motion } from 'framer-motion';
import BoardPreviewSkeleton from 'entities/Board/ui/BoardPreviewSkeleton';
import { useTranslation } from 'react-i18next';
import ModalCreateBoard from 'features/boards/ui/ModalCreateBoard/ModalCreateBoard';
import ModalLinkBoard from 'features/boards/ui/ModalLinkBoard/ModalLinkBoard';
import { homeActions } from '../model/slice/HomeSlice';
import { getHomeBoards } from '../model/selectors/getHomeBoards';
import s from './Home.module.scss';
import HomeHeader from './HomeHeader';

const Home = () => {
    const { user } = useAppSelector((state) => state.userInfo);
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

                        <ModalCreateBoard />
                        <ModalLinkBoard />
                        {
                            boards.length > 0 ? (
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
                                : (
                                    <div className={s.noBoards}>
                                        <p>{t('У вас еще нет проектов')}</p>
                                    </div>
                                )
                        }

                    </Suspense>
                </>
            )}

        </div>

    );
};

export default memo(Home);
