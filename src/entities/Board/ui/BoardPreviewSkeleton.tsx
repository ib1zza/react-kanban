import Skeleton from 'react-loading-skeleton';
import Button from 'shared/ui/Button/Button';
import s from './BoardPreview.module.scss';

const BoardPreviewSkeleton = () => (
    <Skeleton className={s.skeleton} />
);

export default BoardPreviewSkeleton;
