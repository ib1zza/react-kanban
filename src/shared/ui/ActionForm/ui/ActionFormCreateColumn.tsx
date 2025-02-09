import React, {
    memo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { colorsForColumns } from 'shared/constants/colorsForColumns';
import s from './ActionForm.module.scss';
import ColorPicker from '../../ColorPicker/ColorPicker';
import ConfirmButtons from '../../ConfirmButtons/ConfirmButtons';
import { Input, InputTheme } from '../../Input/Input';

interface Props {
  title?: string;
  onAbort: () => void;
  onCreateColumn: (title: string, color: string) => void;
}

function getRandomColor() {
    const i = Math.floor(Math.random() * colorsForColumns.length);
    return colorsForColumns[i];
}

const ActionFormCreateColumn = memo((props: Props) => {
    const {
        title: initTitle,
        onAbort,
        onCreateColumn,
    } = props;
    const [title, setTitle] = useState<string>(initTitle as string);

    const [error, setError] = useState<string>('');
    const [color, setColor] = useState<string>(() => getRandomColor());
    const { t } = useTranslation('buttons');

    const handler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!title) {
            setError('Пустой заголовок');
            return null;
        }
        onCreateColumn(title, color);
    };
    return (
        <form className={`${s.container} ${s.withColor}`}>
            <div className={s.headerColor} style={{ backgroundColor: color }} />
            <hr />
            <div className={s.title}>
                <Input
                    autoFocus
                    theme={InputTheme.WHITE}
                    label={t('Название')}
                    error={error}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <ColorPicker color={color} onChange={setColor} />
            <ConfirmButtons
                disabled={error !== ''}
                onConfirm={(e: { preventDefault: () => void; }) => handler(e)}
                onAbort={onAbort}
            />
        </form>
    );
});

export default ActionFormCreateColumn;
