export const DOCUMENT_ENTITY_TYPES = [
  'ASSET',
  'ACQUISITION',
  'ACQUISITION_ITEM',
  'ASSET_ASSIGNMENT',
  'ASSET_MOVEMENT',
  'PHYSICAL_VERIFICATION',
  'PHYSICAL_VERIFICATION_ITEM',
  'PROPERTY',
  'BUILDING',
  'OWNERSHIP',
  'MAINTENANCE',
  'INCIDENT',
  'INCIDENT_RESOLUTION',
  'RETIREMENT',
  'DISPOSAL',
  'DISPOSAL_ITEM',
] as const;

export type DocumentEntityType = (typeof DOCUMENT_ENTITY_TYPES)[number];

export type DocumentStorageProvider = 'AZURE_BLOB';

export type DocumentTypeRecord = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentVersionRecord = {
  id: string;
  documentId: string;
  versionNumber: number;
  originalFileName: string;
  storedFileName: string;
  storageProvider: DocumentStorageProvider;
  storageContainer: string;
  storageKey: string;
  mimeType: string;
  fileSize: bigint;
  checksum: string | null;
  createdByUserId: string;
  createdAt: Date;
};

export type DocumentRecord = {
  id: string;
  documentTypeId: string;
  entityType: DocumentEntityType;
  entityId: string;
  title: string;
  description: string | null;
  currentVersionId: string | null;
  deletedAt: Date | null;
  deletedByUserId: string | null;
  createdByUserId: string;
  updatedByUserId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentWithCurrentVersion = DocumentRecord & {
  currentVersion: DocumentVersionRecord | null;
};

export type DocumentWithVersions = DocumentRecord & {
  documentType: DocumentTypeRecord;
  versions: DocumentVersionRecord[];
};
