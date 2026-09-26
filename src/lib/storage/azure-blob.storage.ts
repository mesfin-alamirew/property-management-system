import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

import type {
  FileStorage,
  StorageDownloadResult,
  StorageUploadInput,
  StorageUploadResult,
} from './storage.types';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const defaultContainerName = process.env.AZURE_STORAGE_CONTAINER ?? '';

if (!connectionString) {
  throw new Error('AZURE_STORAGE_CONNECTION_STRING is not configured');
}

if (!defaultContainerName) {
  throw new Error('AZURE_STORAGE_CONTAINER is not configured');
}

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

function getContainerClient(containerName: string): ContainerClient {
  return blobServiceClient.getContainerClient(containerName);
}

export const azureBlobStorage: FileStorage = {
  async upload(input: StorageUploadInput): Promise<StorageUploadResult> {
    const containerClient = getContainerClient(input.containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(
      input.storageKey,
    );

    await blockBlobClient.uploadData(input.data, {
      blobHTTPHeaders: {
        blobContentType: input.contentType,
      },
    });

    return {
      storageProvider: 'AZURE_BLOB',
      storageContainer: input.containerName,
      storageKey: input.storageKey,
      storedFileName: input.storageKey.split('/').pop() ?? input.storageKey,
    };
  },

  async download(
    containerName: string,
    storageKey: string,
  ): Promise<StorageDownloadResult> {
    const containerClient = getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(storageKey);

    const response = await blockBlobClient.download();

    if (!response.readableStreamBody) {
      throw new Error('Unable to read blob content');
    }

    const chunks: Buffer[] = [];

    for await (const chunk of response.readableStreamBody) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    return {
      data: Buffer.concat(chunks),
      contentType: response.contentType ?? 'application/octet-stream',
    };
  },

  async delete(containerName: string, storageKey: string): Promise<void> {
    const containerClient = getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(storageKey);

    await blockBlobClient.deleteIfExists();
  },
};

export { defaultContainerName };
