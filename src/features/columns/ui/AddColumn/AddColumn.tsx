import { classNames } from 'shared/lib/classNames/classNames';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import React, { Suspense, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { boardCollectionActions, getBoardCollection } from 'pages/BoardPage';
import { createColumnRt } from 'features/columns/API/createColumn/createColumnRt';
import { useTranslation } from 'react-i18next';
import ActionForm, { ActionFormStatus } from '../../../../shared/ui/ActionForm/ui/ActionForm';
import s from './AddColumn.module.scss';

interface AddColumnProps {
    className?: string
}
const AddColumn = ({ className } : AddColumnProps) => {
    const {
        isCreatingColumn, selectedBoard,
    } = useAppSelector(
        getBoardCollection,
    );

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const createColumnAction = useCallback(
        async (title: string, color: string) => {
            if (!selectedBoard?.uid) return;
            handleCreateColumnCancel();
            await createColumnRt(title, color || '#808080', selectedBoard.uid);
        },
        [selectedBoard?.uid],
    );

    function handleCreateColumnClick() {
        dispatch(boardCollectionActions.setIsCreatingColumn(true));
    }

    function handleCreateColumnCancel() {
        dispatch(boardCollectionActions.setIsCreatingColumn(false));
    }

    return (
        <div className={classNames(s.AddColumn, {}, [className])}>
            {!isCreatingColumn && (
                <div className={s.addColumn}>
                    <Button
                        className={s.add}
                        onClick={handleCreateColumnClick}
                        theme={ButtonTheme.ACCENT}
                        icon={faAdd}
                    >
                        <p>{t('add')}</p>
                    </Button>
                </div>
            )}
                {isCreatingColumn && (
                    <ActionForm
                        status={ActionFormStatus.COLUMN}
                        onCreateColumn={createColumnAction}
                        onAbort={handleCreateColumnCancel}
                    />
                )}
        </div>
    );
};

export { AddColumn };
