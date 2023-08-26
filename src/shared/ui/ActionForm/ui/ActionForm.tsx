import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import s from './ActionForm.module.scss';
import { UserAuth } from '../../../../app/providers/authRouter/ui/AuthContext';
import ColorPicker from '../../ColorPicker/ColorPicker';
import ConfirmButtons from '../../ConfirmButtons/ConfirmButtons';
import { Input } from '../../Input/Input';

export enum ActionFormStatus {
    COLUMN = 'COLUMN',
    BOARD = 'BOARD',
    EDIT = 'EDIT',
    LINK = 'LINK',
}
interface Props {
  title?: string;
  color?: string;
  onAbort: () => void;
  status: ActionFormStatus,
  onCreateColumn?: (title: string, color: string) => void;
  onCreateBoard?: (title: string) => void;
  onEdit?: (title: string, color: string) => void;
  onLink?: (title: string, color: string) => void;
}

const ActionForm = memo((props: Props) => {
    const {
        title: initTitle,
        color: initColor,
        onAbort,
        status,
        onEdit,
        onLink,
        onCreateColumn,
        onCreateBoard,
    } = props;
    const [title, setTitle] = useState(initTitle);
    const { user } = UserAuth();
    const [color, setColor] = useState(initColor);
    const { t } = useTranslation('buttons');

    const addBoard = useCallback(() => {
        if (!title.trim() || !user) return;
        onCreateBoard && onCreateBoard(title);
    }, [onCreateBoard, title, user]);

    const addColumn = useCallback(() => {
        onCreateColumn && onCreateColumn(title, color);
    }, [color, onCreateColumn, title]);

    const handleEdit = useCallback(() => {
        onEdit && onEdit(title, color);
    }, [color, onEdit, title]);

    const handleLink = useCallback(() => {
        onLink && onLink(title, color);
    }, [color, onLink, title]);

    const handler = () => {
        switch (status) {
        case ActionFormStatus.BOARD:
            addBoard();
            break;
        case ActionFormStatus.COLUMN:
            addColumn();
            break;
        case ActionFormStatus.EDIT:
            handleEdit();
            break;
        case ActionFormStatus.LINK:
            handleLink();
            break;
        }
    };

    return (
        <div className={`${s.container} ${status !== ActionFormStatus.BOARD && s.withColor}`}>
            {status !== ActionFormStatus.BOARD && (
                <div className={s.headerColor} style={{ backgroundColor: color }} />
            )}
            <div className={s.title}>
                <Input
                    placeholder={t('Название')}
                    className={s.createColumnTitle}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            {status !== ActionFormStatus.BOARD && <ColorPicker color={color} onChange={setColor} />}
            <ConfirmButtons onConfirm={handler} onAbort={onAbort} />
        </div>
    );
});

export default ActionForm;
