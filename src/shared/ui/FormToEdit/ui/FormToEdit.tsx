import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import s from '../../../../entities/Column/ui/TaskColumn.module.scss';
import ColorPicker from '../../ColorPicker/ColorPicker';
import ConfirmButtons from '../../ConfirmButtons/ConfirmButtons';
import { Input } from '../../Input/Input';

interface Props {
  title: string;
  color: string;
  onEdit: (title: string, color: string) => void;
  onAbort: () => void;
}
const FormToEdit: React.FC<Props> = ({
    title: initTitle,
    color: initColor,
    onEdit,
    onAbort,
}) => {
    const [title, setTitle] = useState(initTitle);
    const [color, setColor] = useState(initColor);
    const { t } = useTranslation('buttons');
    const confirmHandler = () => {
        onEdit(title, color);
    };

    return (
        <div className={s.createColumn}>
            <Input
                placeholder={t('Название')}
                className={`${s.createColumnTitle} ${s.title}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <ColorPicker color={color} onChange={setColor} />
            <ConfirmButtons onConfirm={confirmHandler} onAbort={onAbort} />
        </div>
    );
};

export default FormToEdit;
