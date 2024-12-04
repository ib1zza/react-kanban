import { faCircleCheck as iconCheckRegular } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck as iconCheckSolid, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { ITask } from 'app/types/IBoard';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { toggleTaskComplete } from 'features/tasks';
import { Avatar } from 'shared/ui/Avatar';
import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { boardCollectionActions, getLinkedUsers } from 'pages/BoardPage';
import { IUserInfo } from 'app/types/IUserInfo';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import s from './Task.module.scss';
import Button from '../../../shared/ui/Button/Button';

interface ITaskProps {
  task: ITask;
  boardId: string;
  columnId: string;
}
const Task = memo(({
    task, boardId, columnId,
}: ITaskProps) => {
    const dispatch = useAppDispatch();
    const linkedUsers = useAppSelector(getLinkedUsers);
    const openTaskHandler = () => {
        console.log("clicked on task", task);
        dispatch(boardCollectionActions.setCurrentTask(task));
    };
    const handleComplete = useCallback(() => {
        toggleTaskComplete(task.uid, columnId, boardId, !task.isCompleted);
    }, [boardId, columnId, task.isCompleted, task.uid]);
    const linkedUser = linkedUsers.find((user: IUserInfo) => user.uid === task.attachedUser);

    return (
        <div className={classNames(s.container, { [s.completed]: task.isCompleted })}>
            <div className={s.title}>
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
                    <Avatar
                        src={linkedUser?.photoURL}
                        alt={linkedUser?.displayName}
                        size={AvatarSize.S}
                    />
                ) }
                <Button
                    onClick={
                        openTaskHandler
                    }
                    icon={faEllipsisVertical}
                />

            </div>
        </div>
    );
});

export default Task;
