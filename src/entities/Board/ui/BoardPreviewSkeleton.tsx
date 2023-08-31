import Skeleton from 'react-loading-skeleton';
import Button from 'shared/ui/Button/Button';
import s from './BoardPreview.module.scss';

const BoardPreviewSkeleton = () => (
    <div className={s.container}>
        <h3 className={s.heading}>
            <Skeleton width={60} />
            <div className={s.buttons}>
                <Button
                    style={{ marginRight: '5px' }}
                >
                    <Skeleton circle width={30} height={30} />
                </Button>
                <Button>
                    <Skeleton circle width={30} height={30} />
                </Button>
            </div>

        </h3>
        <p>
            <Skeleton width={60} />
        </p>
    </div>
);

export default BoardPreviewSkeleton;
