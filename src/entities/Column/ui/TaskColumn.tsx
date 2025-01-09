import React, {useState, useCallback} from 'react';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {deleteColumn, editColumn} from 'features/columns';
import {IColumn, IColumnFromServer} from 'app/types/IBoardFromServer';
import Button from 'shared/ui/Button/Button';
import AddTaskBlock from 'entities/Column/lib/AddTaskForm/AddTaskBlock/AddTaskBlock';
import s from './TaskColumn.module.scss';
import TaskList from '../lib/TaskList/TaskList';
import {LayoutGroup, motion, MotionProps} from "framer-motion";
import {useTranslation} from "react-i18next";
import {Input, InputTheme} from "shared/ui/Input/Input";
import ColorPicker from "shared/ui/ColorPicker/ColorPicker";
import ConfirmButtons from "shared/ui/ConfirmButtons/ConfirmButtons";
import AddTaskForm from "entities/Column/lib/AddTaskForm/AddTaskForm";

interface ITaskColumnProps {
    column: IColumn;
    boardId: string;
    controlsDisabled: boolean;
}


const TaskColumn = ({
                        column,
                        boardId,
                        controlsDisabled,
                    }: ITaskColumnProps) => {
    // const {t} = useTranslation('buttons');

    const [isEditColumn, setIsEditColumn] = useState(false);
    const editHandler = async (title: string, color: string) => {
        const res = await editColumn(boardId, column.uid, {
            title,
            color,
        });
        setIsEditColumn(false);
    };

    const [title, setTitle] = useState<string>(column.title);
    const [error, setError] = useState<string>('');
    const [color, setColor] = useState<string>(column.color);


    const handleEdit = useCallback(() => {
        editHandler(title, color);
    }, [color, editHandler, title]);


    const handler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!title) {
            setError('Пустой заголовок');
            return null;
        }
        handleEdit();
    };

    const onAbort = () => {
        setIsEditColumn(false);
    }

    return (
        <motion.div
            key={column.uid}
            variants={{hidden: {opacity: 0}, visible: {opacity: 1}}}
            className={`${s.container} ${s.withColor}`}>
            <div
                className={s.headerColor}
                style={{backgroundColor: color}}
            />
            <hr/>

            {
                isEditColumn ? (
                        <div>
                            <div className={s.title}>
                                <Input
                                    autoFocus
                                    theme={InputTheme.WHITE}
                                    // placeholder={t('Название')}
                                    /*TODO*/
                                    // label={t('Название')}
                                    // className={s.createColumnTitle}
                                    error={error}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <ColorPicker color={color} onChange={setColor}/>
                            <ConfirmButtons
                                disabled={error !== ''}
                                onConfirm={(e: { preventDefault: () => void; }) => handler(e)}
                                onAbort={onAbort}
                            />
                        </div>
                    )
                    :
                    (
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

                            <motion.div
                                layout={
                                    "position"
                                }
                                className={s.taskListWrapper}
                            >
                                <LayoutGroup>
                                    {!controlsDisabled && <AddTaskForm
                                        boardId={boardId}
                                        columnId={column.uid}
                                    />}

                                    <TaskList
                                        boardId={boardId}
                                        columnId={column.uid}
                                        tasks={column.tasks}
                                    />
                                </LayoutGroup>
                            </motion.div>
                        </>
                    )
            }


        </motion.div>)

};

export default TaskColumn;
