import React, {
    memo, useCallback, useEffect, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAdd,
    faCalendarTimes,
    faFilter,
    faPenToSquare,
    faShareAlt, faTrash,
    faWalkieTalkie,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Input } from 'shared/ui/Input/Input';
import Button, { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { Avatar } from 'shared/ui/Avatar';
import { boardCollectionActions, getBoardCollection, getLinkedUsers } from 'pages/BoardPage';
import { IUserInfo } from 'app/types/IUserInfo';
import { useTranslation } from 'react-i18next';
import { deleteBoard } from 'features/boards';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import s from './BoardPageHeader.module.scss';

interface Props {
    title: string;
    isEnabled: boolean;
    onEdit: (newTitle: string) => void;
    onDelete: () => void;
    setIsCreating: (value: boolean) => void;
    // onShare: () => void;
}

const BoardPageHeader: React.FC<Props> = memo(({
    onEdit,
    onDelete,
    title,
    setIsCreating,
    isEnabled,
}: Props) => {
    const [isEditing, setEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(title);
    const linkedUsers = useAppSelector(getLinkedUsers);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    function onShare() {
        dispatch(boardCollectionActions.setShareStatus(true));
    }
    const onEditHandler = () => {
        const len = editingTitle.trim().length;
        if (len > 3 && len < 30) {
            onEdit(editingTitle);
        }
        setEditing(false);
    };

    useEffect(() => {
        setEditingTitle(title);
    }, [title]);

    const handleDelete = useCallback(() => {
        onDelete();
    }, [onDelete]);
    const handleEdit = useCallback(() => {
        setEditing(true);
    }, []);
    return (
        <div className={s.BoardPageHeader}>
            <h1 className={s.title}>
                {!isEditing && (
                    <>
                        <span>{editingTitle}</span>
                        <Button
                            disabled={isEnabled}
                            size={ButtonSize.M}
                            theme={ButtonTheme.WHITE}
                            noBorder
                            className={s.button}
                            onClick={handleEdit}
                        >
                            <MemoizedFontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button
                            disabled={isEnabled}
                            size={ButtonSize.M}
                            theme={ButtonTheme.WHITE}
                            noBorder
                            className={s.button}
                            onClick={handleDelete}
                        >
                            <MemoizedFontAwesomeIcon icon={faTrash} />
                        </Button>
                    </>
                )}
                {isEditing && (
                    <>
                        <Input
                            disabled={isEnabled}
                            className={s.input}
                            maxLength={40}
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                        />
                        <Button
                            disabled={isEnabled}
                            size={ButtonSize.M}
                            theme={ButtonTheme.WHITE}
                            noBorder
                            className={s.button}
                            onClick={onEditHandler}
                        >
                            <MemoizedFontAwesomeIcon icon={faCircleCheck} />
                        </Button>
                    </>
                )}
            </h1>
            <div className={s.second}>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <Button className={s.share} disabled={isEnabled} onClick={onShare}>
                    <MemoizedFontAwesomeIcon icon={faShareAlt} />
                    <p>{t('share')}</p>
                </Button>
                <Button className={s.members} disabled={isEnabled}>
                    <MemoizedFontAwesomeIcon icon={faWalkieTalkie} />
                    <p>{t('members')}</p>
                    {
                        linkedUsers.length > 0 && (
                            <div className={s.linkedUsers}>
                                {linkedUsers.map((user: IUserInfo) => (
                                    <Avatar key={user.uid} src={user.photoURL} alt={user.displayName} />
                                ))}
                            </div>
                        )
                    }
                </Button>
            </div>
            <div className={s.third}>
                <Button className={s.filter} disabled={isEnabled}>
                    <MemoizedFontAwesomeIcon icon={faFilter} />
                    <p>{t('filter')}</p>
                </Button>
                <Button className={s.date} disabled={isEnabled}>
                    <MemoizedFontAwesomeIcon icon={faCalendarTimes} />
                    <p>{t('this week')}</p>
                </Button>
                <Button className={s.add} disabled={isEnabled} onClick={() => setIsCreating(true)}>
                    <MemoizedFontAwesomeIcon icon={faAdd} />
                    <p>{t('add')}</p>
                </Button>
            </div>
        </div>
    );
});

export { BoardPageHeader };
