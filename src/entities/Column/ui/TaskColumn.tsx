import React, { memo, useCallback, useState } from 'react';
import { faCaretLeft, faCaretRight, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { editColumn } from 'features/columns';
import { IColumn } from 'app/types/IBoardFromServer';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { LayoutGroup, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Input, InputTheme } from 'shared/ui/Input/Input';
import ColorPicker from 'shared/ui/ColorPicker/ColorPicker';
import ConfirmButtons from 'shared/ui/ConfirmButtons/ConfirmButtons';
import AddTaskForm from 'entities/Column/lib/AddTaskForm/AddTaskForm';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { moveColumnThunk } from 'pages/BoardPage/model/services/moveColumn/moveColumn';
import { deleteColumnThunk } from 'pages/BoardPage/model/services/deleteColumn/deleteColumn';
import WarningForm from 'shared/ui/WarningForm/WarningForm';
import Modal from 'shared/ui/Modal/Modal';
import s from './TaskColumn.module.scss';
import TaskList from '../lib/TaskList/TaskList';

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
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
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
        dispatch(moveColumnThunk({
            colId: column.uid,
            direction: 'right',
            prevDisplayIndex: column.displayIndex,
        }));
        // TODO
    };

    const handleMoveColumnLeft = () => {
        // TODO
        dispatch(moveColumnThunk({
            colId: column.uid,
            direction: 'left',
            prevDisplayIndex: column.displayIndex,
        }));
    };

    const handleDeleteColumn = () => {
        setIsDeleting(true);
    };

    const onDeleteAbort = () => {
        setIsDeleting(false);
    };

    const onDeleteConfirm = async () => {
        dispatch(deleteColumnThunk({
            columnId: column.uid,
            displayId: column.displayIndex,
        }));
    };

    const { t } = useTranslation();

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
                                placeholder={t('Название')}
                                /* TODO */
                                label={t('Название')}
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
                                            theme={ButtonTheme.ICON}
                                            className={s.editButton}
                                            onClick={() => setIsEditColumn(true)}
                                            icon={faPenToSquare}
                                        />
                                        <Button
                                            theme={ButtonTheme.ICON}
                                            className={s.deleteButton}
                                            onClick={handleDeleteColumn}
                                            icon={faTrashCan}
                                        />
                                    </div>
                                )}

                            </div>

                            <LayoutGroup>

                                {!controlsDisabled && (
                                    <AddTaskForm
                                        boardId={boardId}
                                        columnId={column.uid}
                                    />
                                )}

                                <div
                                    className={s.taskListWrapper}
                                >
                                    <LayoutGroup>

                                        <TaskList
                                            boardId={boardId}
                                            columnId={column.uid}
                                            tasks={column.tasks}
                                        />
                                    </LayoutGroup>
                                </div>
                            </LayoutGroup>

                        </>
                    )
            }
            {isDeleting && (
                <Modal onClose={onDeleteAbort}>
                    <WarningForm
                        title={t('Удаление колонки')}
                        text={t('Уверены что хотите удалить колонку?')}
                        onCancel={onDeleteAbort}
                        onConfirm={onDeleteConfirm}
                    />
                </Modal>
            )}

        </motion.div>
    );
};

export default memo(TaskColumn);
