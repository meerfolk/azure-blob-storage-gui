import { BlobServiceClient } from '@azure/storage-blob';

import { ConnectionModel } from '../../localStorage/connection';

export default function getBlobStorageService(connectionDto: ConnectionModel): BlobServiceClient {
  return new BlobServiceClient(`https://${connectionDto.accountName}.blob.core.windows.net?${connectionDto.sas}`);
}
