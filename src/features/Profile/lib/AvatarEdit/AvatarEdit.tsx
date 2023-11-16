import React, {
    FC, useCallback, useEffect,
} from 'react';
import { ReactSVG } from 'react-svg';
import s from './AvatarEdit.module.scss';

interface AvatarEditProps {
  avatar: string;
  onEdit: (file: File) => void;
}

const AvatarEdit: FC<AvatarEditProps> = ({ avatar, onEdit }) => {
    const [file, setFile] = React.useState<File | null>(null);
    const [loading, setLoading] = React.useState(false);
    const handleUpdateAvatar = useCallback(
        async () => {
            if (file && !loading) {
                setLoading(true);
                await onEdit(file);
                setFile(null);
            }
        },
        [file, loading, onEdit],
    );

    useEffect(() => {
        handleUpdateAvatar().finally(() => setLoading(false));
    }, [file, handleUpdateAvatar]);
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
