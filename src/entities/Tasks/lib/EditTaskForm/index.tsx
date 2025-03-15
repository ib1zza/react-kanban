import React, {
    memo, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ITask } from 'app/types/IBoardFromServer';
import { useAppSelector } from 'app/providers/StoreProvider';
import { EditedData } from 'widgets/PopupTaskInfo/ui/PopupTaskInfo';
import { OptionType, Select } from 'shared/ui/Select';
import ConfirmButtons from 'shared/ui/ConfirmButtons/ConfirmButtons';
import { getLinkedUsers } from 'pages/BoardPage';
import { IUserInfo } from 'app/types/IUserInfo';
import { useUsersInfo } from 'features/users/hooks/useUsersInfo';
import { Input, Textarea } from 'shared/ui/Input/Input';
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
    const linkedUsersInfo = useAppSelector(getLinkedUsers);

    const usersIds = useMemo(() => linkedUsersInfo?.map((el) => el.uid) || [], [linkedUsersInfo]);

    const [linkedUsers] = useUsersInfo(usersIds);
    const { t } = useTranslation();

    const [linkedUserId, setLinkedUserId] = useState(prevTask.attachedUser);

    const options = useMemo<OptionType[]>(() => linkedUsers.map((user) => ({
        value: user.uid,
        heading: user.displayName,
        text: user.email,
        image: user.photoURL,
        withAvatar: true,
    })), [linkedUsers]);

    console.log(linkedUsers);

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
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={t('Заголовок')}
                        label={t('Заголовок')}
                    />
                </div>
                <div>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t('Описание')}
                        label={t('Описание')}
                    />
                </div>
                {linkedUsers.length > 0
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
