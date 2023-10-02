import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                icon={
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#5CD43E' }} />
                }
            >
                {t('Подтвердить')}
            </Button>

            <Button
                theme={ButtonTheme.RED}
                onClick={onAbort}
                icon={
                    <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#DE2525' }} />
                }
            >
                {t('Отменить')}
            </Button>
        </div>
    );
};

export default memo(ConfirmButtons);
