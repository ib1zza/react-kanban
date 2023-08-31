import Skeleton from 'react-loading-skeleton';
import s from './BoardPageHeader.module.scss';
import Button from '../../../../shared/ui/Button/Button';

const BoardPageHeaderSkeleton = () => (
    <h1 className={s.title}>
        <Skeleton
            className={s.input}
            width={30}
        />
        <Button
            className={s.button}
        >
            <Skeleton circle width={30} height={30} />
        </Button>
    </h1>
);

export { BoardPageHeaderSkeleton };
