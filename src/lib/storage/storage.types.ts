export type StorageUploadInput = {
  containerName: string;
  storageKey: string;
  contentType: string;
  data: Buffer;
};

export type StorageUploadResult = {
  storageProvider: 'AZURE_BLOB';
  storageContainer: string;
  storageKey: string;
  storedFileName: string;
};

export type StorageDownloadResult = {
  data: Buffer;
  contentType: string;
};

export interface FileStorage {
  upload(input: StorageUploadInput): Promise<StorageUploadResult>;

  download(
    containerName: string,
    storageKey: string,
  ): Promise<StorageDownloadResult>;

  delete(containerName: string, storageKey: string): Promise<void>;
}
