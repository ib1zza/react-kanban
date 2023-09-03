import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITask } from 'app/types/IBoard';
import { useAppSelector } from 'app/providers/StoreProvider';
import { getLinkedUsers } from 'entities/Board/model/selectors/getLinkedUsers/getLinkedUsers';
import { EditedData } from 'widgets/Task/PopupTaskInfo/PopupTaskInfo';
import { OptionType, Select } from 'shared/ui/Select';
import ConfirmButtons from 'shared/ui/ConfirmButtons/ConfirmButtons';
import s from './EditTaskForm.module.scss';

interface Props {
  onEdit: (data: EditedData) => void;
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
    const linkedUsers = useAppSelector(getLinkedUsers);

    const [linkedUserId, setLinkedUserId] = useState<string | undefined>(
        () => linkedUsers.find((user) => user.uid === prevTask.attachedUser)?.uid,
    );
    const { t } = useTranslation();

    const options = useMemo<OptionType[]>(() => linkedUsers.map((user) => ({
        value: user.uid,
        heading: user.displayName,
        text: user.email,
        image: user.photoURL,
        withAvatar: true,
    })), [linkedUsers]);

    const editHandler = () => {
        console.log('edit');
        if (title === '' || description === '') return onAbort();

        const editedData : EditedData = {};

        if (title !== prevTask.title) {
            editedData.title = title;
        }

        if (description !== prevTask.description) {
            editedData.description = description;
        }

        if (linkedUserId !== prevTask.attachedUser) {
            editedData.attachedUser = linkedUserId;
        }

        console.log(editedData);

        if (Object.keys(editedData).length === 0) return onAbort();
        onEdit(editedData);
    };

    const onConfirmButtons = () => {
        editHandler();
    };
    const onAbortButtons = () => {
        onAbort();
    };

    const handleSelectChange = (value: string | number) => {
        console.log(value);
        setLinkedUserId(String(value));
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
                <div className={s.selectWrapper}>
                    <Select
                        options={options}
                        onChange={handleSelectChange}
                        placeholder={linkedUsers.find((el) => el.uid === linkedUserId)?.displayName
                            || t('Пользователь не прикреплен')}
                        label={t('Исполнитель')}
                    />
                </div>
            </div>
            {/* //TODO: func  */}
            <ConfirmButtons
                onConfirm={onConfirmButtons}
                onAbort={onAbortButtons}
            />
        </div>
    );
};

export default EditTaskForm;
