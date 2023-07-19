import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import s from '../../../../entities/Column/ui/TaskColumn.module.scss';
import { UserAuth } from '../../../../app/providers/authRouter/ui/AuthContext';
import ConfirmButtons from '../../ConfirmButtons/ConfirmButtons';
import ColorPicker from '../../ColorPicker/ColorPicker';

interface Props {
  onAbort: () => void;
  forColumn?: boolean;
  forBoard?: boolean;
  onCreateColumn?: (title: string, color: string) => void;
  onCreateBoard?: (title: string) => void;
  boardId?: string;
}

const FormToLink: React.FC<Props> = ({
    onAbort,
    forColumn,
    forBoard,
    onCreateColumn,
    onCreateBoard,
    boardId,
}) => {
    const { t } = useTranslation('buttons');
    const [title, setTitle] = useState('');
    const { user } = UserAuth();
    const [color, setColor] = useState('#f44336');

    const addBoard = () => {
        if (!title.trim() || !user) return;
        onCreateBoard && onCreateBoard(title);
    };

    const addColumn = () => {
        onCreateColumn && onCreateColumn(title, color);
    };

    const handler = () => {
        if (forColumn) addColumn();
        if (forBoard) addBoard();
    };

    console.log(color);

    return (
        <div className={`${s.container} ${forColumn && s.withColor}`}>
            {forColumn && (
                <div className={s.headerColor} style={{ backgroundColor: color }} />
            )}
            <h6 className={s.title}>
                <input
                    placeholder={t('Ссылка')}
                    className={s.createColumnTitle}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </h6>
            {forColumn && <ColorPicker color={color} onChange={setColor} />}
            <ConfirmButtons onConfirm={handler} onAbort={onAbort} />
        </div>
    );
};

export default FormToLink;
