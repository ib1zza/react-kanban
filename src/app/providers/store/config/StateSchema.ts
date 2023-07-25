import { BoardCollectionSchema } from '../../../../entities/Board';
// eslint-disable-next-line max-len
import { NotificationsSchema } from '../../../../entities/Notifications/model/types/NotificationsSchema';
import { UserInfoSchema } from '../../../../entities/Users/model/types/UserInfoSchema';
import { LoginSchema } from '../../../../features/auth/login/model/types/LoginSchema';

export interface StateSchema {
    boardCollection: BoardCollectionSchema,
    userInfo: UserInfoSchema,
    notifications: NotificationsSchema,
    login: LoginSchema,
}
