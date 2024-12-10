import React, {memo, useCallback, useEffect, useState,} from 'react';
import {faGear, faPenToSquare, faSliders,} from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck} from '@fortawesome/free-regular-svg-icons';
import {Input} from 'shared/ui/Input/Input';
import Button, {ButtonSize, ButtonTheme} from 'shared/ui/Button/Button';
import {useTranslation} from 'react-i18next';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import Modal from 'shared/ui/Modal/Modal';
import s from './BoardPageHeader.module.scss';
import {useUserRole} from "features/boards/hooks/useUserRole";
import {LinkedUserType} from "app/types/IBoardFromServer";

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
                {userRole === LinkedUserType.USER &&<Button
                    size={ButtonSize.L}
                    theme={ButtonTheme.WHITE}
                    noBorder
                    className={s.button}
                    onClick={handleOpenModal}
                >
                    <MemoizedFontAwesomeIcon icon={faGear}/>
                </Button>}
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
