import getBlobStorageService from './getBlobStorageService';
import BlobModel from './blob.model';

import { ConnectionModel } from '../../localStorage/connection';

export default async function getBlobList(connectionDto: ConnectionModel): Promise<BlobModel[]> {
  const blobStorageService = getBlobStorageService(connectionDto);

  const containertClient = blobStorageService.getContainerClient(connectionDto.containerName);

  const iterator = containertClient.listBlobsFlat().byPage({ maxPageSize: 20 });

  const {
    segment: { blobItems },
  } = (await iterator.next()).value;

  return blobItems.map((blob: { name: string }) => new BlobModel(blob.name));
}
