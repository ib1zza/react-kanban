import { faPlus, faLink } from '@fortawesome/free-solid-svg-icons';
import React, { memo, useCallback } from 'react';
import Button from 'shared/ui/Button/Button';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { useTranslation } from 'react-i18next';
import s from './Home.module.scss';

import { homeActions } from '../model/slice/HomeSlice';

const HomeHeader = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('buttons');
    const handleAddBoardStatus = useCallback(() => {
        dispatch(homeActions.setAddBoardStatus(true));
    }, [dispatch]);

    const handleLinkBoardStatus = useCallback(() => {
        dispatch(homeActions.setLinkBoardStatus(true));
    }, [dispatch]);
    return (
        <div className={s.buttons}>
            <Button
                onClick={handleAddBoardStatus}
            >
                <MemoizedFontAwesomeIcon icon={faPlus} />

                {t('Добавить доску')}
            </Button>
            <Button onClick={handleLinkBoardStatus} className={s.share_button}>
                <MemoizedFontAwesomeIcon icon={faLink} />
            </Button>

        </div>

    );
});
export default HomeHeader;
