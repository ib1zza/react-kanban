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
import { IBoard, LinkedUserType } from 'app/types/IBoardFromServer';
import WarningForm from 'shared/ui/WarningForm/WarningForm';
import { editBoard } from 'features/boards';
import s from './BoardPageHeader.module.scss';

interface Props {
    board: IBoard;
    onEdit: (newTitle: string) => void;
    onDelete: () => void;
}

const BoardPageHeader: React.FC<Props> = memo(({
    onEdit,
    onDelete,
    board,
}: Props) => {
    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(board.title);
    const [isPublic, setIsPublic] = useState(board.public);
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
        setEditingTitle(board.title);
    }, [board.title]);
    const handleEditText = useCallback((value: React.SetStateAction<string>) => {
        setEditingTitle(value);
    }, []);
    const handleDeleteStart = useCallback(() => {
        setEditing(false);
        setDeleting(true);
    }, []);

    const handleDeleteAbort = useCallback(() => {
        setDeleting(false);
    }, []);

    const handleDeleteConfirm = useCallback(() => {
        if (isDeleting) {
            onDelete();
            setDeleting(false);
        }
    }, [isDeleting, onDelete]);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value === 'public';

        if (newValue !== isPublic) {
            setIsPublic(newValue);
            editBoard(board.uid, {
                public: newValue,
            });
        }
    };

    return (
        <div className={s.BoardPageHeader}>
            <h1 className={s.title}>
                <div className={s.title__text}>
                    {t('project')}
                    :
                    {' '}
                    {board.title}
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
                        <form className={s.form}>
                            <div className={s.inputContainer}>
                                <Input
                                    className={s.input}
                                    maxLength={40}
                                    type="text"
                                    label={t('Название')}
                                    placeholder={t('Название')}
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
                            <div className={s.radioContainer}>
                                <p className={s.label}>
                                    {t('Access level')}
                                </p>

                                <div className={s.radioButtons}>
                                    <div className={s.radioWrapper}>
                                        <input
                                            type="radio"
                                            id="public"
                                            name="access"
                                            checked={isPublic}
                                            value="public"
                                            onChange={handleRadioChange}

                                        />
                                        <label htmlFor="public">
                                            <span className={s.radioTitle}>{t('Public')}</span>

                                            <span className={s.radioDesc}>
                                                (
                                                {t('Everyone with link can see')}
                                                )
                                            </span>
                                        </label>
                                    </div>
                                    <div className={s.radioWrapper}>
                                        <input
                                            type="radio"
                                            id="private"
                                            name="access"
                                            checked={!isPublic}
                                            value="private"
                                            onChange={handleRadioChange}

                                        />
                                        <label htmlFor="private">
                                            <span className={s.radioTitle}>{t('Private')}</span>

                                            <span className={s.radioDesc}>
                                                (
                                                {t('Only users that you invite via email can see')}
                                                )
                                            </span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </form>
                        <Button
                            onClick={handleDeleteStart}
                            theme={ButtonTheme.RED}
                            size={ButtonSize.M}
                            className={s.deleteProject}
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
