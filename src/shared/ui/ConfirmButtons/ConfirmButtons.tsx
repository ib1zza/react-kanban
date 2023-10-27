import React, { memo } from 'react';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
import Button, { ButtonTheme } from '../Button/Button';
import s from './ConfirmButtons.module.scss';

interface Props {
  onConfirm: (e: any) => any;
  onAbort: () => any;
  disabled?: boolean;
}

const ConfirmButtons: React.FC<Props> = ({ onConfirm, onAbort, disabled }) => {
    const { t } = useTranslation('Buttons');
    return (
        <div className={s.buttons}>
            <Button
                theme={ButtonTheme.GREEN}
                onClick={onConfirm}
                disabled={disabled}
                iconStyles={{ color: '#5CD43E' }}
                icon={faCircleCheck}
            >
                {t('Подтвердить')}
            </Button>

            <Button
                theme={ButtonTheme.RED}
                onClick={onAbort}
                iconStyles={{ color: '#DE2525' }}
                icon={faCircleXmark}
            >
                {t('Отменить')}
            </Button>
        </div>
    );
};

export default memo(ConfirmButtons);
