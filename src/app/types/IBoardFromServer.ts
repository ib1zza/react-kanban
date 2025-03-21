export const enum GuestPermission {
  READ = 'read',
  FULL = 'full',
  NONE = 'none',
}

export const enum LinkedUserType {
  USER = 'user',
  GUEST = 'guest',
}

export interface ITask {
  uid: string;
  title: string;
  description: string;
  timeCreated: string;
  isCompleted: boolean;
  tags: string[];
  creatorId: string;
  attachedUser?: string;
  displayId: number;
}
export interface IColumnFromServer {
  uid: string;
  title: string;
  tasks: { [taskId: string]: ITask };
  timeCreated: string;
  timeUpdated: string;
  color: string;
  displayIndex: number;
}

export interface IColumn {
  uid: string;
  title: string;
  tasks: ITask[];
  timeCreated: string;
  timeUpdated: string;
  color: string;
  displayIndex: number;
}

export interface IBoardSmallInfoFromServer {
  uid: string;
  ownerId: string;
  title: string;
  timeCreated: string;
  timeUpdated: string;
  users?: {
    [userId: string]: {
      role: LinkedUserType;
      dateInvited: number;
      joined: boolean;
    };
  }
}
export interface IBoardUserInfo {
  uid: string;
  role: LinkedUserType;
  dateInvited: number;
  joined: boolean;
  notificationUid?: string;
}

export interface IBoardSmallInfo {
  uid: string;
  ownerId: string;
  title: string;
  timeCreated: string;
  timeUpdated: string;
  users?: IBoardUserInfo[]
}

export interface IBoardFromServer {
  uid: string;
  // chatId?: string;
  columns: { [columnId: string]: IColumnFromServer };
  guestPermissions?: GuestPermission[];
  // guestsAllowed?: string[];
  ownerId: string;
  title: string;
  // usersAllowed?: string[];
  timeCreated: string;
  timeUpdated: string;
  public: boolean;
  users?: {
    [userId: string]: {
      role: LinkedUserType;
      dateInvited: number;
      joined: boolean;
      notificationUid?: string;
    };
  }
}

export interface IBoard {
  uid: string;
  // chatId?: string;
  columns: IColumn[];
  guestPermissions?: GuestPermission[];
  // guestsAllowed?: string[];
  ownerId: string;
  title: string;
  // usersAllowed?: string[];
  timeCreated: string;
  timeUpdated: string;
  users?: IBoardUserInfo[]
  public: boolean;
}
