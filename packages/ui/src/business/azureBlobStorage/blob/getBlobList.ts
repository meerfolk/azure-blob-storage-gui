import moment from 'moment';
import { BlobItem } from '@azure/storage-blob';

import { getContainerClient, BlobModel } from '.';

import { ConnectionModel } from '../../connection';

const PAGE_SIZE = 1000;

export async function getBlobList(connectionDto: ConnectionModel, prefix: string): Promise<BlobModel[]> {
  const containertClient = getContainerClient(connectionDto);

  const iterator = containertClient
    .listBlobsFlat({ prefix })
    .byPage({ maxPageSize: PAGE_SIZE });

  const {
    segment: { blobItems },
  } = (await iterator.next()).value;

  return blobItems.map((blob: BlobItem) => new BlobModel(
    blob.name,
    moment(blob.properties.lastModified)
      .format('YYYY-MM-DD HH:mm:ss Z'),
  ));
}
