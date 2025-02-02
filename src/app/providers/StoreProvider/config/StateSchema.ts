import { NotificationsSchema } from 'entities/Notifications';
import { UserInfoSchema } from 'features/users/model/types/UserInfoSchema';
import { LoginSchema } from 'features/auth/login';
import { SignupSchema } from 'features/auth/signup';
import { BoardCollectionSchema } from 'pages/BoardPage';
import { HomeSchema } from 'pages/Home';
import { ErrorSchema } from 'entities/Error/model/types';

export interface StateSchema {
    boardCollection: BoardCollectionSchema,
    userInfo: UserInfoSchema,
    notifications: NotificationsSchema,
    login: LoginSchema,
    signup: SignupSchema,
    home: HomeSchema,
    error: ErrorSchema
}
