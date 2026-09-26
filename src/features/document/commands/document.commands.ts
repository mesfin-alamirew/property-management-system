import { randomUUID } from 'node:crypto';

import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';
import {
  azureBlobStorage,
  defaultContainerName,
} from '@/lib/storage/azure-blob.storage';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';

import {
  createDocumentRecord,
  createDocumentVersionRecord,
  findActiveDocumentById,
  findLatestDocumentVersion,
  updateDocumentCurrentVersion,
  softDeleteDocumentRecord,
} from '../repositories/document.repository';

import { documentEntityExists } from '../repositories/document-entity.repository';

import {
  calculateDocumentFileChecksum,
  validateDocumentFile,
} from './document-file.commands';

import type { DocumentFormData } from '../schemas/document.schema';
import type { DocumentFileInput } from '../types/document-file.types';
import type { DocumentEntityType } from '@/generated/prisma/client';

function createDocumentStorageKey(
  entityType: DocumentEntityType,
  entityId: string,
): string {
  return [
    'documents',
    entityType.toLowerCase(),
    entityId,
    `${randomUUID()}`,
  ].join('/');
}

function createDocumentVersionStorageKey(
  documentId: string,
  versionNumber: number,
): string {
  return [
    'documents',
    'versions',
    documentId,
    `${versionNumber}-${randomUUID()}`,
  ].join('/');
}

async function validateDocumentType(documentTypeId: string): Promise<void> {
  const documentType = await prisma.documentType.findUnique({
    where: {
      id: documentTypeId,
    },
  });

  if (!documentType) {
    throw new AppError('Document Type not found', 'DOCUMENT_TYPE_NOT_FOUND');
  }

  if (!documentType.isActive) {
    throw new AppError('Document Type is inactive', 'DOCUMENT_TYPE_INACTIVE');
  }
}

async function validateDocumentEntity(
  entityType: DocumentEntityType,
  entityId: string,
): Promise<void> {
  const exists = await documentEntityExists(entityType, entityId);

  if (!exists) {
    throw new AppError('Related record not found', 'DOCUMENT_ENTITY_NOT_FOUND');
  }
}

export async function createDocument(
  userId: string,
  data: DocumentFormData,
  file: DocumentFileInput,
) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT:CREATE',
  });

  await validateDocumentType(data.documentTypeId);

  await validateDocumentEntity(data.entityType, data.entityId);

  const validatedFile = await validateDocumentFile(file);

  const checksum = calculateDocumentFileChecksum(validatedFile.data);

  const storageKey = createDocumentStorageKey(data.entityType, data.entityId);

  const uploadResult = await azureBlobStorage.upload({
    containerName: defaultContainerName,
    storageKey,
    contentType: validatedFile.mimeType,
    data: validatedFile.data,
  });

  try {
    return await prisma.$transaction(async (tx) => {
      const document = await createDocumentRecord(tx, {
        documentTypeId: data.documentTypeId,
        entityType: data.entityType,
        entityId: data.entityId,
        title: data.title,
        description: data.description,
        createdByUserId: userId,
        updatedByUserId: userId,
      });

      const version = await createDocumentVersionRecord(tx, {
        documentId: document.id,
        versionNumber: 1,
        originalFileName: validatedFile.originalFileName,
        storedFileName: uploadResult.storedFileName,
        storageProvider: uploadResult.storageProvider,
        storageContainer: uploadResult.storageContainer,
        storageKey: uploadResult.storageKey,
        mimeType: validatedFile.mimeType,
        fileSize: validatedFile.fileSize,
        checksum,
        createdByUserId: userId,
      });

      await updateDocumentCurrentVersion(tx, document.id, version.id, userId);

      await recordAuditEvent(tx, {
        userId,
        action: AUDIT_ACTIONS.DOCUMENT_CREATED,
        entityType: AUDIT_ENTITY_TYPES.DOCUMENT,
        entityId: document.id,
        description: `Document "${document.title}" was created`,
        newValue: {
          documentTypeId: document.documentTypeId,
          entityType: document.entityType,
          entityId: document.entityId,
          title: document.title,
          versionNumber: 1,
          originalFileName: validatedFile.originalFileName,
        },
      });

      await recordAuditEvent(tx, {
        userId,
        action: AUDIT_ACTIONS.DOCUMENT_VERSION_CREATED,
        entityType: AUDIT_ENTITY_TYPES.DOCUMENT,
        entityId: document.id,
        description: `Document version 1 was created`,
        newValue: {
          versionNumber: 1,
          originalFileName: validatedFile.originalFileName,
          mimeType: validatedFile.mimeType,
          fileSize: validatedFile.fileSize.toString(),
          checksum,
          storageProvider: uploadResult.storageProvider,
        },
      });

      return {
        id: document.id,
        versionId: version.id,
      };
    });
  } catch (error) {
    try {
      await azureBlobStorage.delete(
        uploadResult.storageContainer,
        uploadResult.storageKey,
      );
    } catch {
      // Preserve the original database error.
    }

    throw error;
  }
}

export async function updateDocument(
  userId: string,
  id: string,
  data: DocumentFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT:UPDATE',
  });

  const document = await findActiveDocumentById(id);

  if (!document) {
    throw new AppError('Document not found', 'DOCUMENT_NOT_FOUND');
  }

  await validateDocumentType(data.documentTypeId);

  if (
    document.entityType !== data.entityType ||
    document.entityId !== data.entityId
  ) {
    await validateDocumentEntity(data.entityType, data.entityId);
  }

  return prisma.$transaction(async (tx) => {
    const updatedDocument = await tx.document.update({
      where: {
        id,
      },
      data: {
        documentTypeId: data.documentTypeId,
        entityType: data.entityType,
        entityId: data.entityId,
        title: data.title,
        description: data.description,
        updatedByUserId: userId,
      },
    });

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.DOCUMENT_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.DOCUMENT,
      entityId: updatedDocument.id,
      description: `Document "${updatedDocument.title}" was updated`,
      oldValue: {
        documentTypeId: document.documentTypeId,
        entityType: document.entityType,
        entityId: document.entityId,
        title: document.title,
        description: document.description,
      },
      newValue: {
        documentTypeId: updatedDocument.documentTypeId,
        entityType: updatedDocument.entityType,
        entityId: updatedDocument.entityId,
        title: updatedDocument.title,
        description: updatedDocument.description,
      },
    });

    return updatedDocument;
  });
}

export async function createDocumentVersion(
  userId: string,
  documentId: string,
  file: DocumentFileInput,
) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT:UPDATE',
  });

  const document = await findActiveDocumentById(documentId);

  if (!document) {
    throw new AppError('Document not found', 'DOCUMENT_NOT_FOUND');
  }

  const validatedFile = await validateDocumentFile(file);

  const latestVersion = await findLatestDocumentVersion(documentId);

  const versionNumber = (latestVersion?.versionNumber ?? 0) + 1;

  const checksum = calculateDocumentFileChecksum(validatedFile.data);

  const storageKey = createDocumentVersionStorageKey(documentId, versionNumber);

  const uploadResult = await azureBlobStorage.upload({
    containerName: defaultContainerName,
    storageKey,
    contentType: validatedFile.mimeType,
    data: validatedFile.data,
  });

  try {
    return await prisma.$transaction(async (tx) => {
      const version = await createDocumentVersionRecord(tx, {
        documentId,
        versionNumber,
        originalFileName: validatedFile.originalFileName,
        storedFileName: uploadResult.storedFileName,
        storageProvider: uploadResult.storageProvider,
        storageContainer: uploadResult.storageContainer,
        storageKey: uploadResult.storageKey,
        mimeType: validatedFile.mimeType,
        fileSize: validatedFile.fileSize,
        checksum,
        createdByUserId: userId,
      });

      await updateDocumentCurrentVersion(tx, documentId, version.id, userId);

      await recordAuditEvent(tx, {
        userId,
        action: AUDIT_ACTIONS.DOCUMENT_VERSION_CREATED,
        entityType: AUDIT_ENTITY_TYPES.DOCUMENT,
        entityId: documentId,
        description: `Document version ${versionNumber} was created`,
        newValue: {
          versionNumber,
          originalFileName: validatedFile.originalFileName,
          mimeType: validatedFile.mimeType,
          fileSize: validatedFile.fileSize.toString(),
          checksum,
          storageProvider: uploadResult.storageProvider,
        },
      });

      return version;
    });
  } catch (error) {
    try {
      await azureBlobStorage.delete(
        uploadResult.storageContainer,
        uploadResult.storageKey,
      );
    } catch {
      // Preserve the original database error.
    }

    throw error;
  }
}

export async function deleteDocument(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT:DELETE',
  });

  const document = await findActiveDocumentById(id);

  if (!document) {
    throw new AppError('Document not found', 'DOCUMENT_NOT_FOUND');
  }

  return prisma.$transaction(async (tx) => {
    const deletedDocument = await softDeleteDocumentRecord(tx, id, userId);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.DOCUMENT_DELETED,
      entityType: AUDIT_ENTITY_TYPES.DOCUMENT,
      entityId: deletedDocument.id,
      description: `Document "${document.title}" was deleted`,
      oldValue: {
        documentTypeId: document.documentTypeId,
        entityType: document.entityType,
        entityId: document.entityId,
        title: document.title,
        description: document.description,
        currentVersionId: document.currentVersionId,
      },
    });

    return deletedDocument;
  });
}
