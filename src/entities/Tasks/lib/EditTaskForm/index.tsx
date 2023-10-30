import React, {
    memo, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ITask } from 'app/types/IBoard';
import { useAppSelector } from 'app/providers/StoreProvider';
import { EditedData } from 'widgets/Task/PopupTaskInfo/PopupTaskInfo';
import { OptionType, Select } from 'shared/ui/Select';
import ConfirmButtons from 'shared/ui/ConfirmButtons/ConfirmButtons';
import { getLinkedUsers } from 'pages/BoardPage';
import { IUserInfo } from 'app/types/IUserInfo';
import s from './EditTaskForm.module.scss';

interface Props {
  onEdit: (data: EditedData) => void;
  onAbort: () => void;
  prevTask: ITask;
  loading: boolean;
}

const EditTaskForm = memo(({
    onEdit,
    onAbort,
    prevTask,
    loading,
}: Props) => {
    const [title, setTitle] = useState(prevTask.title);
    const [description, setDescription] = useState(prevTask.description);
    const linkedUsers = useAppSelector(getLinkedUsers);

    const [linkedUserId, setLinkedUserId] = useState<string | undefined>(
        () => linkedUsers.find((user: IUserInfo) => user.uid === prevTask.attachedUser)?.uid,
    );
    const { t } = useTranslation();

    const options = useMemo<OptionType[]>(() => linkedUsers.map((user: IUserInfo) => ({
        value: user.uid,
        heading: user.displayName,
        text: user.email,
        image: user.photoURL,
        withAvatar: true,
    })), [linkedUsers]);

    const editHandler = useCallback(() => {
        if (title === '') return onAbort();
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
        if (Object.keys(editedData).length === 0) return onAbort();
        onEdit(editedData);
    // eslint-disable-next-line max-len
    }, [description, linkedUserId, onAbort, onEdit, prevTask.attachedUser, prevTask.description, prevTask.title, title]);

    const onConfirmButtons = useCallback(() => {
        editHandler();
    }, [editHandler]);
    const onAbortButtons = () => {
        onAbort();
    };

    const handleSelectChange = useCallback((value: string | number) => {
        setLinkedUserId(String(value));
    }, []);

    return (
        <div>
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
                {linkedUsers.length > 1
                    && (
                        <div className={s.selectWrapper}>
                            <Select
                                options={options}
                                onChange={handleSelectChange}
                                placeholder={linkedUsers.find((el) => el.uid === linkedUserId)?.displayName
                                || t('Пользователь не прикреплен')}
                                label={t('Исполнитель')}
                            />
                        </div>
                    )}
            </div>
            <ConfirmButtons
                onConfirm={onConfirmButtons}
                onAbort={onAbortButtons}
            />
        </div>
    );
});

export default EditTaskForm;
