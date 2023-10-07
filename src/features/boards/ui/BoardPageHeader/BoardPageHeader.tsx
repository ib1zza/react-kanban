import React, { useEffect, useState } from 'react';
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
import { useAppSelector } from 'app/providers/StoreProvider';
import { Avatar } from 'shared/ui/Avatar';
import { getBoardCollection, getLinkedUsers } from 'pages/BoardPage';
import { IUserInfo } from 'app/types/IUserInfo';
import { useTranslation } from 'react-i18next';
import { deleteBoard } from 'features/boards';
import s from './BoardPageHeader.module.scss';

interface Props {
    title: string;
    onEdit: (newTitle: string) => void;
    onDelete: () => void;
    setIsCreating: (value: boolean) => void;
    onShare: () => void;
}

const BoardPageHeader: React.FC<Props> = ({
    onEdit, onDelete, title, setIsCreating, onShare,
}) => {
    const [isEditing, setEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(title);
    const linkedUsers = useAppSelector(getLinkedUsers);
    const { t } = useTranslation();
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

    const handleDelete = () => {
        onDelete();
    };

    useEffect(() => {

    }, []);
    return (
        <div className={s.BoardPageHeader}>
            <h1 className={s.title}>
                {!isEditing && (
                    <>
                        <span>{editingTitle}</span>
                        <Button
                            size={ButtonSize.M}
                            theme={ButtonTheme.WHITE}
                            noBorder
                            className={s.button}
                            onClick={() => setEditing(true)}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button
                            size={ButtonSize.M}
                            theme={ButtonTheme.WHITE}
                            noBorder
                            className={s.button}
                            onClick={handleDelete}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </>
                )}
                {isEditing && (
                    <>
                        <Input
                            className={s.input}
                            maxLength={40}
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                        />
                        <Button
                            size={ButtonSize.M}
                            theme={ButtonTheme.WHITE}
                            noBorder
                            className={s.button}
                            onClick={onEditHandler}
                        >
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </Button>
                    </>
                )}
                {/* { */}
                {/*    linkedUsers.length > 0 && ( */}
                {/*        <div className={s.linkedUsers}> */}
                {/*            {linkedUsers.map((user: IUserInfo) => ( */}
                {/*                <Avatar key={user.uid} src={user.photoURL} alt={user.displayName} /> */}
                {/*            ))} */}
                {/*        </div> */}
                {/*    ) */}
                {/* } */}
            </h1>
            <div className={s.second}>
                <div className={s.share} onClick={onShare}>
                    <FontAwesomeIcon icon={faShareAlt} />
                    <p>{t('share')}</p>
                </div>
                <div className={s.members}>
                    <FontAwesomeIcon icon={faWalkieTalkie} />
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
                </div>
            </div>
            <div className={s.third}>
                <div className={s.filter}>
                    <FontAwesomeIcon icon={faFilter} />
                    <p>{t('filter')}</p>
                </div>
                <div className={s.date}>
                    <FontAwesomeIcon icon={faCalendarTimes} />
                    <p>{t('this week')}</p>
                </div>
                <div className={s.add} onClick={() => setIsCreating(true)}>
                    <FontAwesomeIcon icon={faAdd} />
                    <p>{t('add')}</p>
                </div>
            </div>
        </div>
    );
};

export { BoardPageHeader };
