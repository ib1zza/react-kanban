import Skeleton from 'react-loading-skeleton';
import s from './Task.module.scss';
import Button from '../../../shared/ui/Button/Button';

const TaskSkeleton = () => (
    <div className={s.container}>
        <div>
            <Button
                className={s.icon}
            >
                <Skeleton circle width={30} height={30} />
            </Button>
            <Skeleton width={60} />
        </div>
        <div>
            <Button>
                <Skeleton circle width={30} height={30} />
            </Button>
            <Button>
                <Skeleton circle width={30} height={30} />
            </Button>

        </div>
    </div>
);

export default TaskSkeleton;
