import React, { useState, useCallback, memo } from 'react';
import { faCaretLeft, faCaretRight, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { deleteColumn, editColumn } from 'features/columns';
import { IColumn, IColumnFromServer } from 'app/types/IBoardFromServer';
import Button from 'shared/ui/Button/Button';
import AddTaskBlock from 'entities/Column/lib/AddTaskForm/AddTaskBlock/AddTaskBlock';
import { LayoutGroup, motion, MotionProps } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Input, InputTheme } from 'shared/ui/Input/Input';
import ColorPicker from 'shared/ui/ColorPicker/ColorPicker';
import ConfirmButtons from 'shared/ui/ConfirmButtons/ConfirmButtons';
import AddTaskForm from 'entities/Column/lib/AddTaskForm/AddTaskForm';
import { classNames } from 'shared/lib/classNames/classNames';
import TaskList from '../lib/TaskList/TaskList';
import s from './TaskColumn.module.scss';

interface ITaskColumnProps {
    column: IColumn;
    boardId: string;
    controlsDisabled: boolean;
    canMoveLeft: boolean;
    canMoveRight: boolean;
}

const TaskColumn = ({
    column,
    boardId,
    controlsDisabled,
    canMoveRight,
    canMoveLeft,
}: ITaskColumnProps) => {
    const [isEditColumn, setIsEditColumn] = useState(false);

    const [title, setTitle] = useState<string>(column.title);
    const [error, setError] = useState<string>('');
    const [color, setColor] = useState<string>(column.color);

    const handleEditMemoized = useCallback(async (e: any) => {
        e.preventDefault();
        if (!title) {
            setError('Пустой заголовок');
            return null;
        }
        const res = await editColumn(boardId, column.uid, {
            title,
            color,
        });
        setIsEditColumn(false);
    }, [title, color]);

    const onAbortMemoized = useCallback(() => {
        setIsEditColumn(false);
    }, []);

    const handleMoveColumnRight = () => {
        // TODO
    };

    const handleMoveColumnLeft = () => {
        // TODO
    };

    return (
        <motion.div
            layout
            key={column.uid}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: 'tween',
                        ease: 'easeInOut',
                        duration: 0.2,
                    },
                },
            }}
            whileHover="columnHover"
            className={`${s.container} ${s.withColor}`}
        >
            <div
                className={s.headerColor}
                style={{ backgroundColor: color }}
            >
                {
                    !controlsDisabled
                    && (
                        <motion.div
                            variants={{
                                visible: {
                                    opacity: 0,
                                },
                                columnHover: {
                                    opacity: 1,
                                },
                            }}
                            className={s.columnButtons}
                        >
                            {canMoveLeft && (
                                <Button
                                    className={classNames(s.moveColumnButton, {}, [s.left])}
                                    icon={faCaretLeft}
                                    onClick={handleMoveColumnLeft}
                                />
                            )}
                            {canMoveRight && (
                                <Button
                                    className={classNames(s.moveColumnButton, {}, [s.right])}
                                    icon={faCaretRight}
                                    onClick={handleMoveColumnRight}
                                />
                            )}
                        </motion.div>
                    )
                }
            </div>

            <hr />

            {
                isEditColumn ? (
                    <div>
                        <div className={s.title}>
                            <Input
                                autoFocus
                                theme={InputTheme.WHITE}
                                // placeholder={t('Название')}
                                /* TODO */
                                // label={t('Название')}
                                // className={s.createColumnTitle}
                                error={error}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <ColorPicker color={color} onChange={setColor} />
                        <ConfirmButtons
                            disabled={error !== ''}
                            onConfirm={handleEditMemoized}
                            onAbort={onAbortMemoized}
                        />
                    </div>
                )
                    : (
                        <>
                            <div className={s.titleBlock}>
                                <h6 className={s.title}>{column.title}</h6>
                                {!controlsDisabled && (
                                    <div className={s.columnButtons}>
                                        <Button
                                            className={s.editButton}
                                            onClick={() => setIsEditColumn(true)}
                                            icon={faPenToSquare}
                                        />
                                        <Button
                                            className={s.deleteButton}
                                            onClick={() => deleteColumn(boardId, column.uid)}
                                            icon={faTrashCan}
                                        />
                                    </div>
                                )}

                            </div>

                            <div
                                className={s.taskListWrapper}
                            >
                                <LayoutGroup>
                                    {!controlsDisabled && (
                                        <AddTaskForm
                                            boardId={boardId}
                                            columnId={column.uid}
                                        />
                                    )}

                                    <TaskList
                                        boardId={boardId}
                                        columnId={column.uid}
                                        tasks={column.tasks}
                                    />
                                </LayoutGroup>
                            </div>
                        </>
                    )
            }

        </motion.div>
    );
};

export default memo(TaskColumn);
