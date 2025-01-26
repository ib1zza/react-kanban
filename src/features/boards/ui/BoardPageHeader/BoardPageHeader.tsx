import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Input } from 'shared/ui/Input/Input';
import Button, { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import Modal from 'shared/ui/Modal/Modal';
import { useUserRole } from 'features/boards/hooks/useUserRole';
import { LinkedUserType } from 'app/types/IBoardFromServer';
import WarningForm from 'shared/ui/WarningForm/WarningForm';
import s from './BoardPageHeader.module.scss';

interface Props {
    title: string;
    onEdit: (newTitle: string) => void;
    onDelete: () => void;
}

const BoardPageHeader: React.FC<Props> = memo(({
    onEdit,
    onDelete,
    title,
}: Props) => {
    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(title);
    const { t } = useTranslation();
    const userRole = useUserRole();

    const handleOpenModal = () => {
        setEditing(true);
    };

    const handleCloseModal = () => {
        setEditing(false);
    };

    const onEditHandler = useCallback(() => {
        const len = editingTitle.trim().length;
        if (len > 3 && len < 30) {
            onEdit(editingTitle);
        }
        setEditing(false);
    }, [editingTitle, onEdit]);

    useEffect(() => {
        setEditingTitle(title);
    }, [title]);
    const handleEditText = useCallback((value: React.SetStateAction<string>) => {
        setEditingTitle(value);
    }, []);
    const handleDeleteStart = useCallback(() => {
        setEditing(false);
        setDeleting(true);
    }, [onDelete]);

    const handleDeleteAbort = useCallback(() => {
        setDeleting(false);
    }, [isDeleting]);

    const handleDeleteConfirm = useCallback(() => {
        if (isDeleting) {
            onDelete();
            setDeleting(false);
        }
    }, [isDeleting, onDelete]);

    return (
        <div className={s.BoardPageHeader}>
            <h1 className={s.title}>
                <div className={s.title__text}>
                    {t('project')}
                    :
                    {' '}
                    {title}
                </div>
                {userRole === LinkedUserType.USER && (
                    <Button
                        size={ButtonSize.L}
                        theme={ButtonTheme.WHITE}
                        noBorder
                        className={s.button}
                        onClick={handleOpenModal}
                    >
                        <MemoizedFontAwesomeIcon icon={faGear} />
                    </Button>
                )}
            </h1>

            {userRole === LinkedUserType.USER && isEditing && (
                <Modal onClose={handleCloseModal} title={t('editProject')}>
                    <div className={s.contentWrapper}>
                        <div className={s.inputWrapper}>
                            <label className={s.label}>{t('Название')}</label>
                            <div className={s.inputContainer}>
                                <Input
                                    className={s.input}
                                    maxLength={40}
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => handleEditText(e.target.value)}
                                />
                                <Button
                                    size={ButtonSize.M}
                                    theme={ButtonTheme.WHITE}
                                    noBorder
                                    className={s.button}
                                    onClick={onEditHandler}
                                >
                                    <MemoizedFontAwesomeIcon icon={faCircleCheck} />
                                </Button>
                            </div>
                        </div>
                        <Button
                            onClick={handleDeleteStart}
                            theme={ButtonTheme.RED}
                            size={ButtonSize.M}
                            className={s.logout}
                        >
                            {t('Удалить проект')}
                        </Button>
                    </div>
                </Modal>
            )}
            {
                isDeleting && (
                    <Modal onClose={handleDeleteAbort}>
                        <WarningForm
                            onCancel={handleDeleteAbort}
                            onConfirm={handleDeleteConfirm}
                            title={t('Удаление проекта')}
                            text={t('Вы действительно хотите удалить проект?')}
                        />
                    </Modal>
                )
            }
        </div>
    );
});

export { BoardPageHeader };
