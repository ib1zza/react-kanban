import { faCircleCheck as iconCheckRegular } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck as iconCheckSolid, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { IBoardUserInfo, ITask } from 'app/types/IBoardFromServer';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { toggleTaskComplete } from 'features/tasks';
import { Avatar } from 'shared/ui/Avatar';
import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { boardCollectionActions, getLinkedUsers } from 'pages/BoardPage';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useUserInfo } from 'features/users/hooks/useUserInfo';
import s from './Task.module.scss';
import Button, { ButtonTheme } from '../../../shared/ui/Button/Button';

interface ITaskProps {
    task: ITask;
    boardId: string;
    columnId: string;
    draggable: boolean;
}

interface ITaskUserProps {
    userId: string;
}

const TaskUser = ({ userId }: ITaskUserProps) => {
    const [linkedUser] = useUserInfo(userId);

    return (
        <Avatar
            src={linkedUser?.photoURL}
            alt={linkedUser?.displayName}
            size={AvatarSize.S}
        />
    );
};

const Task = memo(({
    task, boardId, columnId, draggable,
}: ITaskProps) => {
    const dispatch = useAppDispatch();
    const openTaskHandler = () => {
        dispatch(boardCollectionActions.setCurrentTask(task));
    };
    const handleComplete = useCallback(() => {
        toggleTaskComplete(task.uid, columnId, boardId, !task.isCompleted);
    }, [boardId, columnId, task.isCompleted, task.uid]);

    const handleStartDrag = (event: React.DragEvent) => {
        console.log('start', task);
        event.dataTransfer.setDragImage(event.currentTarget, 0, 0);
        console.log(event.currentTarget);
        dispatch(boardCollectionActions.setDraggedTask(task));
    };
    return (
        <>

            <div
                className={classNames(
                    s.container,
                    {
                        [s.completed]:
                        task.isCompleted,
                    },
                )}
                draggable={draggable}
                onDragStart={handleStartDrag}
            >
                <div
                    className={s.title}
                >
                    <Button
                        className={s.icon}
                        onClick={handleComplete}
                        icon={!task.isCompleted ? (
                            iconCheckRegular
                        ) : (
                            iconCheckSolid
                        )}
                    />
                    <span>{task.title}</span>
                </div>

                <div className={s.infoBlock}>
                    {task.attachedUser && (
                        <TaskUser userId={task.attachedUser} />
                    )}
                    <Button
                        className={s.icon}
                        theme={ButtonTheme.ICON}
                        onClick={
                            openTaskHandler
                        }
                        icon={faEllipsisVertical}
                    />

                </div>
            </div>
        </>
    );
});

export default Task;
