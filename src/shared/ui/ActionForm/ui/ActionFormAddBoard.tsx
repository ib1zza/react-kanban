import React, {
    memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import s from './ActionForm.module.scss';
import { Input, InputTheme } from '../../Input/Input';

interface Props {
    onSubmit: (title: string) => void;
    label: string;
}

const ActionFormAddBoard = memo((props: Props) => {
    const {
        onSubmit,
        label,
    } = props;
    const [title, setTitle] = useState<string>('');

    const { t } = useTranslation('buttons');

    const handler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!title.trim()) return;
        onSubmit(title);
    };

    return (
        <form>
            <div className={s.title}>
                <Input
                    autoFocus
                    // theme={InputTheme.WHITE}
                    placeholder={label}
                    label={label}
                    title={label}
                    className={s.createColumnTitle}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <Button
                theme={ButtonTheme.GREEN}
                onClick={handler}
                disabled={!title.trim()}
                iconStyles={{ color: '#34ff00' }}
                icon={faCircleCheck}
                className={s.btnConfirm}
            >
                {t('Подтвердить')}
            </Button>
        </form>
    );
});

export default ActionFormAddBoard;
