import { ConnectionModel } from '../connection';
import { getContainerClient } from './blob/getContainerClient';

export async function uploadBlob(connection: ConnectionModel, file: File, name: string): Promise<void> {
    console.log(file);
    const containerClient = getContainerClient(connection);

    await containerClient.uploadBlockBlob(name, file, file.size);
}
