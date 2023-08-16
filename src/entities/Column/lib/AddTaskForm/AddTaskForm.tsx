import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
import Button from 'shared/ui/Button/Button';
import { createTask } from 'features/tasks';
import { UserAuth } from 'app/providers/authRouter/ui/AuthContext';
import s from './AddTaskForm.module.scss';

interface Props {
  onAbort: () => void;
  onSubmit: () => void;
  boardId: string;
  columnId: string;
}

const AddTaskForm: React.FC<Props> = ({
    onAbort,
    onSubmit,
    boardId,
    columnId,
}) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const { user } = UserAuth();
    const { t } = useTranslation();
    const handler = () => {
        createTask(
            {
                title, description, creatorId: user?.uid as string, tags: [],
            },
            boardId,
            columnId,
        ).then(onSubmit);
    };

    return (
        <div className={s.wrapper}>
            <form>
                <div className={s.inputBlock}>
                    <label htmlFor={t('Заголовок')}>Title:</label>
                    <textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={s.min}
                        id={t('Заголовок')}
                        placeholder={`%${t('Заголовок')}%`}
                        maxLength={50}
                    />
                </div>
                <div className={s.inputBlock}>
                    <label htmlFor={t('Описание')}>Description (optional):</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id={t('Описание')}
                        placeholder={`%${t('Описание')}%`}
                        maxLength={200}
                    />
                </div>
            </form>
            <div className={s.createColumnButtons}>
                <Button
                    onClick={handler}
                    icon={(
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            style={{ color: '#5CD43E' }}
                        />
                    )}
                >
                    Confirm
                </Button>

                <Button
                    onClick={onAbort}
                    icon={(
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            style={{ color: '#DE2525' }}
                        />
                    )}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default AddTaskForm;
