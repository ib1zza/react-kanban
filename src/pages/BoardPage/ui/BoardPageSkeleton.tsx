import { BoardPageHeaderSkeleton } from 'features/boards/ui/BoardPageHeader/BoardPageHeaderSkeleton';
import TaskColumnSkeleton from 'entities/Column/ui/TaskColumnSkeleton';

import s from './BoardPage.module.scss';

const BoardPageSkeleton = () => (
    <div className={s.wrapperContainer}>
        <BoardPageHeaderSkeleton />
        <div className={s.wrapper}>
            <div className={s.columnsWrapper}>
                <TaskColumnSkeleton />
            </div>

        </div>
    </div>
);

export default BoardPageSkeleton;
