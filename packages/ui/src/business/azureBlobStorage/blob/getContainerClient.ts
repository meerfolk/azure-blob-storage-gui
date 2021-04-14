import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

import { ConnectionModel } from '../../connection';

const clientsCache: Record<string, ContainerClient> = {};

function createContainerClient(connection: ConnectionModel): ContainerClient {
  const blobService = new BlobServiceClient(`https://${connection.accountName}.blob.core.windows.net?${connection.sas}`);
  const containerService = blobService.getContainerClient(connection.containerName);

  clientsCache[connection.id] = containerService;

  return containerService;
}

export function getContainerClient(connection: ConnectionModel): ContainerClient {
  const cachedClient = clientsCache[connection.id];

  if (cachedClient) {
    return cachedClient;
  }

  return createContainerClient(connection);
}
