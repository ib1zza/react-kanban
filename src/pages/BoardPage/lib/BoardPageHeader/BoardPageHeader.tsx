import React, {useEffect, useState} from 'react';
import s from "./BoardPageHeader.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";

interface Props {
    title: string;
    onEdit: (newTitle: string) => void;
}

const BoardPageHeader: React.FC<Props> = ({onEdit, title}) => {
    const [isEditing, setEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(title);

    const onEditHandler = () => {
        const len = editingTitle.trim().length
        if(len > 3 && len < 30) {
            onEdit(editingTitle)
        }
        setEditing(false)
    }

    useEffect(() => {
        setEditingTitle(title)
    }, [title])

    return (
        <h1 className={s.title}>
            {!isEditing && <>
                <span>{editingTitle}</span>
                <button className={s.button}
                    onClick={() => setEditing(true)}
                >
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </button>
            </>
            }
            {isEditing && <>
                <input className={s.input} maxLength={40} type="text" value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)}/>
                <button className={s.button}
                    onClick={onEditHandler}
                >
                    <FontAwesomeIcon icon={faCircleCheck}/>
                </button>
            </>}
        </h1>
    );
};

export default BoardPageHeader;