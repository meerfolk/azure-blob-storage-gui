import { getContainerClient, BlobModel } from '.';

import { ConnectionModel } from '../../localStorage/connection';

const PAGE_SIZE = 1000;

export async function getBlobList(connectionDto: ConnectionModel): Promise<BlobModel[]> {
  const containertClient = getContainerClient(connectionDto);

  const iterator = containertClient.listBlobsFlat().byPage({ maxPageSize: PAGE_SIZE });

  const {
    segment: { blobItems },
  } = (await iterator.next()).value;

  return blobItems.map((blob: { name: string }) => new BlobModel(blob.name));
}
