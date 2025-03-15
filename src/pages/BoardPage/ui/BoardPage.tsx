import React, {
    memo, Suspense,
} from 'react';
import { PopupTaskInfo } from 'widgets';
import {
    BoardPageHeader,
} from 'features/boards';
import { TaskColumn } from 'entities/Column';
import Loader from 'shared/ui/Loader/Loader';
import AddColumn from 'features/columns/ui/AddColumn/AddColumn';
import { AnimatePresence, motion } from 'framer-motion';
import ModalShareBoard from 'features/boards/ui/ModalShareBoard/ModalShareBoard';
import { useLogic } from 'pages/BoardPage/hooks/useLogic';
import s from './BoardPage.module.scss';

const BoardPage = () => {
    const {
        selectedBoard,
        selectedTask,
        controlsDisabled,
        handleEditTitle,
        handleDeleteBoard,
    } = useLogic();

    return (
        <>
            <ModalShareBoard />
            <div className={s.wrapperContainer}>
                {selectedBoard && (
                    <BoardPageHeader
                        onEdit={handleEditTitle}
                        board={selectedBoard}
                        onDelete={handleDeleteBoard}
                    />
                )}
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
                                {!controlsDisabled && <AddColumn />}
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
};

export default memo(BoardPage);
