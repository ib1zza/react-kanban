import React, {
    FC, FunctionComponent, SVGAttributes, useEffect,
} from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { ReactSVG } from 'react-svg';
import s from './AvatarEdit.module.scss';

import { storage } from '../../../../firebase';
import { updateDocument } from '../../../../features/users/API/updateDocument';

interface AvatarEditProps {
  avatar: string;
  onEdit: (file: File) => void;
}

const AvatarEdit: FC<AvatarEditProps> = ({ avatar, onEdit }) => {
    const [file, setFile] = React.useState<File | null>(null);
    const [loading, setLoading] = React.useState(false);
    console.log(avatar);
    const handleUpdateAvatar = async () => {
        if (file && !loading) {
            setLoading(true);
            await onEdit(file);
            setFile(null);
        }
    };

    useEffect(() => {
        handleUpdateAvatar().finally(() => setLoading(false));

        console.log('work');
    }, [file]);
    return (
        <div className={s.profile__avatar}>
            {avatar ? (
                <img src={avatar} alt="avatar" />
            ) : (
                <ReactSVG src="../../../../assets/images/noAvatar.svg" />
            )}

            <label className={s.profile__avatar__edit} htmlFor="changeAva">
                <input
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    id="changeAva"
                    type="file"
                    hidden
                />
                <span>change</span>
            </label>
        </div>
    );
};

export default AvatarEdit;
