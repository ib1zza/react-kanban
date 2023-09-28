import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import { Input, InputTheme } from 'shared/ui/Input/Input';
import { getUserFromEmail } from 'features/users';
import { IBoard, LinkedUserType } from 'app/types/IBoard';
import { sendNotificationInvite } from 'entities/Notifications';
import Button from 'shared/ui/Button/Button';
import { addUserToBoard } from 'features/boards';
import s from './ShareBoard.module.scss';

interface Props {
  board: IBoard;
}

const InviteUserForm: FC<Props> = ({ board }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [valueStatus, setValueStatus] = useState<LinkedUserType>(
        LinkedUserType.GUEST,
    );

    const { user } = useAuth();
    const { t } = useTranslation();
    const handleShare = async (email: string) => {
        const userToInviteId = await getUserFromEmail(email).then((res) => res?.uid);
        if (!userToInviteId || !user?.uid) return false;

        await sendNotificationInvite(userToInviteId, user.uid, board.uid, valueStatus);
        await addUserToBoard(board.uid, userToInviteId, valueStatus);

        return true;
    };

    const handleSubmit = () => {
        if (email.trim() !== '') {
            handleShare(email).then((res) => {
                if (res) {
                    setSuccess(t('Добавлен'));
                } else {
                    setError('Не найден');
                }
            });
        } else {
            setError('Нет данных');
            setTimeout(() => {
                setError('');
            }, 1000);
        }
    };

    // Switching notifs
    useEffect(() => {
        setTimeout(() => {
            setError('');
            setSuccess('');
        }, 2000);
    }, [error, success]);

    return (
        <div className={s.form__share}>
            <div className={s.form__title}>
                {t('Добавление в общий доступ')}
            </div>

            <div className={s.form__checkboxes}>
                <p style={{ marginRight: '4px' }}>
                    {t('Статус')}
                    :
                </p>
                <label style={{ marginRight: '10px' }}>
                    <input
                        type="radio"
                        value={LinkedUserType.GUEST}
                        name="status"
                        checked={valueStatus === LinkedUserType.GUEST}
                        onChange={(e) => setValueStatus(e.target.value as LinkedUserType)}
                    />
                    {t('Гость')}
                </label>
                <label>
                    <input
                        type="radio"
                        value={LinkedUserType.USER}
                        name="status"
                        checked={valueStatus === LinkedUserType.USER}
                        onChange={(e) => setValueStatus(e.target.value as LinkedUserType)}
                    />
                    {t('Редактор')}
                </label>
            </div>
            <div className={s.form__error}>{error}</div>
            <Input
                placeholder={t('Введите почту')}
                value={email}
                theme={InputTheme.CLEAR}
                className={s.form__input}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
                onClick={() => handleSubmit()}
            >
                {t('Добавить')}

            </Button>
            <div className={s.form__success}>{success}</div>
        </div>
    );
};

export default InviteUserForm;
