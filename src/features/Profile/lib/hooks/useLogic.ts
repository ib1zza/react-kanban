import { useAppSelector } from 'app/providers/StoreProvider';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';
import { useAuth, UserAuth } from 'app/providers/authRouter/ui/AuthContext';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { IUserInfo } from 'app/types/IUserInfo';
import { editDisplayName, getUserInfo } from 'features/users';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'shared/config/firebase/firebase';
import { updateDocument } from 'shared/API/updateDocument';

export const useLogic = () => {
    const { user } = useAppSelector(getUserState);
  const { refetch, user: userFirebase } = UserAuth();
    const [editStatus, setEditStatus] = useState(false);
    const [name, setName] = useState<string>('');
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

    const fetchUserInfo = useCallback(async () => {
        if (!user?.uid) return;
        return getUserInfo(user.uid).then((res) => {
            setUserInfo(res as SetStateAction<IUserInfo | null>);
            setName(res?.displayName || '');
        });
    }, [user?.uid]);

    useEffect(() => {
        fetchUserInfo();
    }, [user]);

    const handleSubmit = useCallback(async () => {
        if (!user || !/^[a-z0-9_]+$/.test(name)) return;
        await editDisplayName(user.uid, name);
        fetchUserInfo();
    }, [fetchUserInfo, name, user]);

    const onAvatarUpdate = useCallback(
        async (file: File) => {
            if (!user?.displayName) return;

            const storageRef = ref(storage, user.displayName);
            const uploadImage = uploadBytesResumable(storageRef, file);

            uploadImage.on('state_changed', null, null, () => {
                getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
                    await updateDocument('users', user.uid, { photoURL: downloadURL });

                    refetch();

                    fetchUserInfo();
                });
                return true;
            });
        },
        [fetchUserInfo, refetch, user?.displayName, user?.uid]
    );

    return {
        editStatus,
        setEditStatus,
        name,
        setName,
        userInfo,
        userFirebase,
        handleSubmit,
        onAvatarUpdate,
    };
};
