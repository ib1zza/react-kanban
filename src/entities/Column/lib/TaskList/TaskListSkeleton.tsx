import TaskSkeleton from 'entities/Tasks/ui/TaskSkeleton';
import s from './TaskList.module.scss';

const TaskListSkeleton = () => (
    <div className={s.tasks}>
        <TaskSkeleton />
    </div>
);
export default TaskListSkeleton;
