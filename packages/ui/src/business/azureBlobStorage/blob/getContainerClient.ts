import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

import { ConnectionModel } from '../../connection';

export function getContainerClient(connectionDto: ConnectionModel): ContainerClient {
  const blobService = new BlobServiceClient(`https://${connectionDto.accountName}.blob.core.windows.net?${connectionDto.sas}`);

  return blobService.getContainerClient(connectionDto.containerName);
}
