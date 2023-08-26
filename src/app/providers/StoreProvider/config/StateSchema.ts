import { BoardCollectionSchema } from 'entities/Board';
import { NotificationsSchema } from 'entities/Notifications';
import { UserInfoSchema } from 'features/users/model/types/UserInfoSchema';
import { LoginSchema } from 'features/auth/login';
import { SignupSchema } from 'features/auth/signup';

export interface StateSchema {
    boardCollection: BoardCollectionSchema,
    userInfo: UserInfoSchema,
    notifications: NotificationsSchema,
    login: LoginSchema
    signup: SignupSchema
}
