import React, {
    Suspense,
    memo,
} from 'react';
import { BoardPreview } from 'entities/Board';
import { motion } from 'framer-motion';
import BoardPreviewSkeleton from 'entities/Board/ui/BoardPreviewSkeleton';
import { useTranslation } from 'react-i18next';
import ModalCreateBoard from 'features/boards/ui/ModalCreateBoard/ModalCreateBoard';
import ModalLinkBoard from 'features/boards/ui/ModalLinkBoard/ModalLinkBoard';
import { useLogic } from 'pages/Home/hooks/useLogic';
import s from './Home.module.scss';
import HomeHeader from './HomeHeader';

const Loader = (
    <div className={s.blocks__container}>
        {[1, 2, 3].map((el) => (
            <BoardPreviewSkeleton
                key={`skeleton${el}`}
            />
        ))}
    </div>
);

const Home = () => {
    const { user, boards } = useLogic();

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
