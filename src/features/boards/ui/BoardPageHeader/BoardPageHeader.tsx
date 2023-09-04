import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Input } from 'shared/ui/Input/Input';
import Button from 'shared/ui/Button/Button';
import { useAppSelector } from 'app/providers/StoreProvider';
import { Avatar } from 'shared/ui/Avatar';
import { getLinkedUsers } from 'pages/BoardPage';
import { IUserInfo } from 'app/types/IUserInfo';
import s from './BoardPageHeader.module.scss';

interface Props {
    title: string;
    onEdit: (newTitle: string) => void
}

const BoardPageHeader: React.FC<Props> = ({ onEdit, title }) => {
    const [isEditing, setEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(title);
    const linkedUsers = useAppSelector(getLinkedUsers);
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

    useEffect(() => {

    }, []);

    return (
        <h1 className={s.title}>
            {!isEditing && (
                <>
                    <span>{editingTitle}</span>
                    <Button
                        className={s.button}
                        onClick={() => setEditing(true)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
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
                        className={s.button}
                        onClick={onEditHandler}
                    >
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </Button>
                </>
            )}
            {
                linkedUsers.length > 0 && (
                    <div className={s.linkedUsers}>
                        {linkedUsers.map((user: IUserInfo) => (
                            <Avatar key={user.uid} src={user.photoURL} alt={user.displayName} />
                        ))}
                    </div>
                )
            }
        </h1>
    );
};

export { BoardPageHeader };
