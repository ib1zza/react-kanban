import { updateDocument } from "./utils/updateDocument";

export async function editDisplayName(userId: string, newName: string) {
    return await updateDocument("users", userId, {
        displayName: newName,
    });
}