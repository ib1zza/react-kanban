import React, { memo, useMemo } from 'react';
import { ITask, LinkedUserType } from 'app/types/IBoardFromServer';
import { classNames } from 'shared/lib/classNames/classNames';
import { motion } from 'framer-motion';
import { boardCollectionActions } from 'pages/BoardPage';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { dragTaskThunk } from 'pages/BoardPage/model/services/dragTask/dragTask';
import { useUserRole } from 'features/boards/hooks/useUserRole';
import s from './TaskList.module.scss';
import Task from '../../../Tasks/ui/Task';

interface ITaskListProps {
    boardId: string;
    columnId: string;
    tasks: ITask[];
}

interface ITaskDragIndicatorProps {
    taskBeforeId: string | number;
    columnId: string;
}

export const TaskDragIndicator = ({ taskBeforeId, columnId }: ITaskDragIndicatorProps) => (
    <div
        className={s.indicator}
        data-before={taskBeforeId}
        data-column={columnId}
    />
);

const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();

            const offset = e.clientY - (box.top + DISTANCE_OFFSET);

            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            }
            return closest;
        },
        {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
        },
    );

    return el;
};

const TaskList: React.FC<ITaskListProps> = ({
    tasks,
    boardId,
    columnId,
}) => {
    const userRole = useUserRole();

    const getTasksFromColumn = (
        tasks: ITask[],
    ): ITask[] => [...tasks].sort((a, b) => a.displayId - b.displayId);

    const dispatch = useAppDispatch();

    const [active, setActive] = React.useState(false);
    const getIndicators = () => Array.from(
        document.querySelectorAll(
            `[data-column="${columnId}"]`,
        ) as unknown as HTMLElement[],
    );

    const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.classList.toggle(s.indicator__active, false);
        });
    };

    const highlightIndicator = (e: DragEvent) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);
        el.element.classList.toggle(s.indicator__active, true);
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        console.log('drag over');
        highlightIndicator(e);
        setActive(true);
    };

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        console.log('drag leave');
        setActive(false);
        clearHighlights();
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        setActive(false);

        clearHighlights();
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        console.log(columnId);
        dispatch(dragTaskThunk({
            newColumnId: columnId,
            newDisplayId: +(element.dataset.before || -1),
        }));
        console.log('drag drop');
    };

    const handleDragEnd = () => {
        console.log('drag end');
        clearHighlights();
    };

    const cls = classNames(s.tasks, {
        [s.active]: active,
    });

    const controlsDisabled = useMemo(() => userRole !== LinkedUserType.USER, [userRole]);

    return (
        <motion.div
            layout
            // layoutId={columnId}
            className={cls}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
        >
            {tasks
                && getTasksFromColumn(tasks).map((el: ITask) => (
                    <motion.div
                        key={el.uid}
                        layoutId={el.uid}
                        layout
                    >
                        <TaskDragIndicator taskBeforeId={el.displayId} columnId={columnId} />
                        <Task
                            boardId={boardId}
                            columnId={columnId}
                            task={el}
                            key={el.uid}
                            draggable={!controlsDisabled}
                        />
                    </motion.div>
                ))}
            {!controlsDisabled && <TaskDragIndicator taskBeforeId="-1" columnId={columnId} />}
        </motion.div>
    );
};

export default memo(TaskList);
