import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import s from './BoardPageHeader.module.scss';
import Button from '../../../../shared/ui/Button/Button';
import { Input } from '../../../../shared/ui/Input/Input';

interface Props {
    title: string;
    onEdit: (newTitle: string) => void;
}

const BoardPageHeader: React.FC<Props> = ({ onEdit, title }) => {
    const [isEditing, setEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(title);

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
        </h1>
    );
};

export { BoardPageHeader };
