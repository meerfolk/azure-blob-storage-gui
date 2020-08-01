import { getContainerClient } from '.';
import { ConnectionModel } from '../../localStorage/connection';

async function blobToString(blob: Blob): Promise<string> {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onloadend = (e) => {
      resolve(e.target?.result as string);
    };
    fileReader.onerror = reject;
    fileReader.readAsText(blob);
  });
}

export async function getBlob(connectionModel: ConnectionModel, blobName: string): Promise<string> {
  const containerClient = getContainerClient(connectionModel);

  const blobClient = containerClient.getBlobClient(blobName);

  const downloadBlockBlobResponse = await blobClient.download();
  const blobBody = await downloadBlockBlobResponse.blobBody;

  if (!blobBody) {
    throw new Error('Blob body is undefined');
  }

  return blobToString(blobBody);
}
