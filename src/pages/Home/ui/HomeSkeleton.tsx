import Button from 'shared/ui/Button/Button';
import Skeleton from 'react-loading-skeleton';
import BoardPreviewSkeleton from 'entities/Board/ui/BoardPreviewSkeleton';
import s from './Home.module.scss';

const HomeSkeleton = () => (

    <div className={s.boardPageContainer}>
        <div className={s.blocks__container}>
            <BoardPreviewSkeleton />
        </div>

        <div className={s.buttons}>
            <Button>
                <Skeleton circle width={30} height={30} />
            </Button>
            <Button>
                <Skeleton circle width={30} height={30} />
            </Button>
        </div>
    </div>

);

export default HomeSkeleton;
