import { BoardCollectionSchema } from "../../../../entities/Board";
import { NotificationsSchema 
} from "../../../../entities/Notifications/model/types/NotificationsSchema";
import { UserInfoSchema } from "../../../../entities/Users/model/types/UserInfoSchema";

export interface StateSchema {
    boardCollection: BoardCollectionSchema,
    userInfo: UserInfoSchema,
    notifications: NotificationsSchema
}
