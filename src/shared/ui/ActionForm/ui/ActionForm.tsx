import React, {
    memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import s from './ActionForm.module.scss';
import { UserAuth } from '../../../../app/providers/authRouter/ui/AuthContext';
import ColorPicker from '../../ColorPicker/ColorPicker';
import ConfirmButtons from '../../ConfirmButtons/ConfirmButtons';
import { Input, InputTheme } from '../../Input/Input';

export enum ActionFormStatus {
    COLUMN = 'COLUMN',
    BOARD = 'BOARD',
    LINK = 'LINK',
}
interface Props {
  title?: string;
  color?: string;
  onAbort: () => void;
  status: ActionFormStatus,
  onCreateColumn?: (title: string, color: string) => void;
  onCreateBoard?: (title: string) => void;
  onLink?: (title: string, color: string) => void;
}

const ActionForm = memo((props: Props) => {
    const {
        title: initTitle,
        color: initColor,
        onAbort,
        status,
        onLink,
        onCreateColumn,
        onCreateBoard,
    } = props;
    const [title, setTitle] = useState<string>(initTitle as string);
    const { user } = UserAuth();
    const [error, setError] = useState<string>('');
    const [color, setColor] = useState<string>(initColor as string);
    const { t } = useTranslation('buttons');
    const addBoard = useCallback(() => {
        if (!title.trim() || !user) return;
        onCreateBoard && onCreateBoard(title);
    }, [onCreateBoard, title, user]);

    const addColumn = useCallback(() => {
        onCreateColumn && onCreateColumn(title, color);
    }, [color, onCreateColumn, title]);

    const handleLink = useCallback(() => {
        onLink && onLink(title, color);
    }, [color, onLink, title]);

    const handler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!title) {
            setError('Пустой заголовок');
            return null;
        }
        switch (status) {
        case ActionFormStatus.BOARD:
            addBoard();
            break;
        case ActionFormStatus.COLUMN:
            addColumn();
            break;
        case ActionFormStatus.LINK:
            handleLink();
            break;
        }
    };
    return (
        <form className={`${s.container} ${status !== ActionFormStatus.BOARD && s.withColor}`}>
            {status !== ActionFormStatus.BOARD && (
                <>
                    <div className={s.headerColor} style={{ backgroundColor: color }} />
                    <hr />
                </>
            )}
            <div className={s.title}>
                <Input
                    autoFocus
                    theme={InputTheme.WHITE}
                    // placeholder={t('Название')}
                    label={t('Название')}
                    // className={s.createColumnTitle}
                    error={error}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            {status !== ActionFormStatus.BOARD && <ColorPicker color={color} onChange={setColor} />}
            <ConfirmButtons
                disabled={error !== ''}
                onConfirm={(e: { preventDefault: () => void; }) => handler(e)}
                onAbort={onAbort}
            />
        </form>
    );
});

export default ActionForm;
