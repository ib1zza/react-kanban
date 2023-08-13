import { updateDocument } from '../../../../shared/API/updateDocument';

export async function editDisplayName(userId: string, newName: string) {
    return updateDocument('users', userId, {
        displayName: newName,
    });
}
