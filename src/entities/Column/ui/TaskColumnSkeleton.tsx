import TaskListSkeleton from '../lib/TaskList/TaskListSkeleton';
import s from './TaskColumn.module.scss';

const TaskColumnSkeleton = () => (
    <div className={`${s.container} ${s.withColor}`}>
        <div
            className={s.headerColor}
        />
        <TaskListSkeleton />
    </div>
);

export default TaskColumnSkeleton;
