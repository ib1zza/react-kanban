import React, { useState } from 'react';
import {
    faCircleCheck,
    faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import s from './EditTaskForm.module.scss';
import { ITask } from '../../../../app/types/IBoard';
import Button from '../../../../shared/ui/Button/Button';
import ConfirmButtons from '../../../../shared/ui/ConfirmButtons/ConfirmButtons';

interface Props {
  onEdit: (title: string, description: string) => void;
  onAbort: () => void;
  prevTask: ITask;
  loading: boolean;
}

const EditTaskForm: React.FC<Props> = ({
    onEdit,
    onAbort,
    prevTask,
    loading,
}) => {
    const [title, setTitle] = useState(prevTask.title);
    const [description, setDescription] = useState(prevTask.description);
    const { t } = useTranslation();
    const editHandler = () => {
        if (title === '' || description === '') return onAbort();
        if (title === prevTask.title && description === prevTask.description) return onAbort();
        onEdit(title, description);
    };
    return (
        <div>
            <h2>{t('Редактирование')}</h2>
            <div className={s.form}>
                <div>
                    <label htmlFor="titleInput">{t('Заголовок')}</label>
                    <input
                        value={title}
                        id="titleInput"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={t('Заголовок')}
                    />
                </div>
                <div>
                    <label htmlFor="descriptionInput">{t('Описание')}</label>
                    <textarea
                        value={description}
                        id="descriptionInput"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t('Описание')}
                    />
                </div>
            </div>
            {/* //TODO: func  */}
            <ConfirmButtons
                onConfirm={function () {
                    throw new Error('Function not implemented.');
                }}
                onAbort={function () {
                    throw new Error('Function not implemented.');
                }}
            />
        </div>
    );
};

export default EditTaskForm;
