import React, {
    memo, useCallback, useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import s from './ActionForm.module.scss';
import ColorPicker from '../../ColorPicker/ColorPicker';
import ConfirmButtons from '../../ConfirmButtons/ConfirmButtons';
import {Input, InputTheme} from '../../Input/Input';

interface Props {
    title?: string;
    color?: string;
    onAbort: () => void;
    onEdit?: (title: string, color: string) => void;
}

const ActionFormEditColumn = memo((props: Props) => {
    const {
        title: initTitle,
        color: initColor,
        onAbort,
        onEdit,
    } = props;
    const [title, setTitle] = useState<string>(initTitle as string);
    const [error, setError] = useState<string>('');
    const [color, setColor] = useState<string>(initColor as string);
    const {t} = useTranslation('buttons');


    const handleEdit = useCallback(() => {
        onEdit && onEdit(title, color);
    }, [color, onEdit, title]);


    const handler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!title) {
            setError('Пустой заголовок');
            return null;
        }
        handleEdit();
    };
    return (
        <form className={`${s.container} ${s.withColor}`}>

            <div className={s.headerColor} style={{backgroundColor: color}}/>
            <hr/>
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
            <ColorPicker color={color} onChange={setColor}/>
            <ConfirmButtons
                disabled={error !== ''}
                onConfirm={(e: { preventDefault: () => void; }) => handler(e)}
                onAbort={onAbort}
            />
        </form>
    );
});

export default ActionFormEditColumn;
