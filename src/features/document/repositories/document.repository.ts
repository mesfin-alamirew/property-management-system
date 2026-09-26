import { prisma } from '@/lib/prisma';

export async function findDocuments() {
  return prisma.document.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      documentType: true,
      versions: {
        orderBy: {
          versionNumber: 'desc',
        },
      },
    },
  });
}

export async function findActiveDocumentById(id: string) {
  return prisma.document.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      documentType: true,
      versions: {
        orderBy: {
          versionNumber: 'desc',
        },
      },
    },
  });
}

export async function findDocumentsByEntity(
  entityType: string,
  entityId: string,
) {
  return prisma.document.findMany({
    where: {
      entityType: entityType as never,
      entityId,
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      documentType: true,
      versions: {
        orderBy: {
          versionNumber: 'desc',
        },
      },
    },
  });
}

export async function findDocumentVersionById(id: string) {
  return prisma.documentVersion.findUnique({
    where: {
      id,
    },
    include: {
      document: {
        include: {
          documentType: true,
        },
      },
    },
  });
}

export async function findLatestDocumentVersion(documentId: string) {
  return prisma.documentVersion.findFirst({
    where: {
      documentId,
    },
    orderBy: {
      versionNumber: 'desc',
    },
  });
}

export async function createDocumentRecord(
  tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
  data: {
    documentTypeId: string;
    entityType: string;
    entityId: string;
    title: string;
    description?: string;
    createdByUserId: string;
    updatedByUserId: string;
  },
) {
  return tx.document.create({
    data: {
      documentTypeId: data.documentTypeId,
      entityType: data.entityType as never,
      entityId: data.entityId,
      title: data.title,
      description: data.description,
      createdByUserId: data.createdByUserId,
      updatedByUserId: data.updatedByUserId,
    },
  });
}

export async function createDocumentVersionRecord(
  tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
  data: {
    documentId: string;
    versionNumber: number;
    originalFileName: string;
    storedFileName: string;
    storageProvider: 'AZURE_BLOB';
    storageContainer: string;
    storageKey: string;
    mimeType: string;
    fileSize: bigint;
    checksum?: string;
    createdByUserId: string;
  },
) {
  return tx.documentVersion.create({
    data: {
      documentId: data.documentId,
      versionNumber: data.versionNumber,
      originalFileName: data.originalFileName,
      storedFileName: data.storedFileName,
      storageProvider: data.storageProvider,
      storageContainer: data.storageContainer,
      storageKey: data.storageKey,
      mimeType: data.mimeType,
      fileSize: data.fileSize,
      checksum: data.checksum,
      createdByUserId: data.createdByUserId,
    },
  });
}

export async function updateDocumentCurrentVersion(
  tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
  documentId: string,
  currentVersionId: string,
  updatedByUserId: string,
) {
  return tx.document.update({
    where: {
      id: documentId,
    },
    data: {
      currentVersionId,
      updatedByUserId,
    },
  });
}

export async function softDeleteDocumentRecord(
  tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
  id: string,
  deletedByUserId: string,
) {
  return tx.document.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
      deletedByUserId,
      updatedByUserId: deletedByUserId,
    },
  });
}
