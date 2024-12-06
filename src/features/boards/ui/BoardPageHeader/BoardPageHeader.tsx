import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import {
    faAdd,

    faPenToSquare,
    faShareAlt, faTrash,
    faWalkieTalkie,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Input } from 'shared/ui/Input/Input';
import Button, { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { Avatar } from 'shared/ui/Avatar';
import { boardCollectionActions, getLinkedUsers } from 'pages/BoardPage';
import { IUserInfo } from 'app/types/IUserInfo';
import { useTranslation } from 'react-i18next';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import Modal from 'shared/ui/Modal/Modal';
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
    const [isEditing, setEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(title);
    const { t } = useTranslation();

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
    const handleDelete = useCallback(() => {
        onDelete();
    }, [onDelete]);

    return (
        <div className={s.BoardPageHeader}>
            <h1 className={s.title}>
                        <span>
                            {t('project')}
                            :
                            {' '}
                            {title}
                        </span>
                        <Button
                            size={ButtonSize.M}
                            theme={ButtonTheme.WHITE}
                            noBorder
                            className={s.button}
                            onClick={handleOpenModal}
                        >
                            <MemoizedFontAwesomeIcon icon={faPenToSquare} />
                        </Button>
            </h1>

            {isEditing && (
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
                            onClick={handleDelete}
                            theme={ButtonTheme.RED}
                            size={ButtonSize.M}
                            className={s.logout}
                        >
                            {t('Удалить проект')}
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
});

export { BoardPageHeader };
