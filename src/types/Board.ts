export const enum GuestPermission {
    READ = "read",
    FULL = "full",
    NONE = "none",
}

export interface Board {
    uid: string;
    chatId?: string;
    columns: { [key: string]: IColumn };
    guestPermissions: GuestPermission[];
    ownerId: string;
    title: string;
    usersAllowed: string[];
    timeCreated: string;
    timeUpdated: string;
}

export interface IColumn {
    uid: string,
    title: string,
    tasks: { [x: string]: ITask },
    timeCreated: string,
    timeUpdated: string,
    color: string
}

export interface ITask {
    uid: string;
    title: string;
    description: string;
    timeCreated: string;
    isCompleted: boolean;
    tags: string[];
    chatId?: string;
    creatorId: string;
    subtasks: { [id: string]: any };
}