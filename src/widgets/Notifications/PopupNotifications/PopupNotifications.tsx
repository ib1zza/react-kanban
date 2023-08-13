import React from 'react';

import { useAppSelector } from '../../../app/providers/StoreProvider/config/store';

const PopupNotifications = () => {
    const { notifications } = useAppSelector((state) => state.notifications);
    // TODO: FINISH
    return (
        <div>
            {JSON.stringify(notifications)}
        </div>
    );
};

export default PopupNotifications;
