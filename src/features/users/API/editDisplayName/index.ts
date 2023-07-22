import { updateDocument } from '../updateDocument';

export async function editDisplayName(userId: string, newName: string) {
    return updateDocument('users', userId, {
        displayName: newName,
    });
}
