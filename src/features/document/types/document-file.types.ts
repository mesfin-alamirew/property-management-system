export type DocumentFileInput = {
  originalFileName: string;
  mimeType: string;
  data: Buffer;
};

export type ValidatedDocumentFile = {
  originalFileName: string;
  extension: string;
  mimeType: string;
  data: Buffer;
  fileSize: bigint;
};
