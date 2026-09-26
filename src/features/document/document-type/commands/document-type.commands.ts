import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  findDocumentTypeByCode,
  findDocumentTypeById,
  createDocumentTypeRecord,
  updateDocumentTypeRecord,
  deactivateDocumentTypeRecord,
} from '../repositories/document-type.repository';

import type { DocumentTypeFormData } from '../schemas/document-type.schema';

export async function createDocumentType(
  userId: string,
  data: DocumentTypeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT_TYPE:CREATE',
  });

  const existingDocumentType = await findDocumentTypeByCode(data.code);

  if (existingDocumentType) {
    if (!existingDocumentType.isActive) {
      throw new AppError(
        'Document type code already exists on an inactive Document Type',
        'CODE_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Document type code already exists', 'DUPLICATE_CODE');
  }

  return createDocumentTypeRecord(data);
}

export async function updateDocumentType(
  userId: string,
  id: string,
  data: DocumentTypeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT_TYPE:UPDATE',
  });

  const documentType = await findDocumentTypeById(id);

  if (!documentType) {
    throw new AppError('Document Type not found', 'DOCUMENT_TYPE_NOT_FOUND');
  }

  const existingDocumentType = await findDocumentTypeByCode(data.code, id);

  if (existingDocumentType) {
    if (!existingDocumentType.isActive) {
      throw new AppError(
        'Document type code already exists on an inactive Document Type',
        'CODE_EXISTS_ON_INACTIVE_RECORD',
      );
    }

    throw new AppError('Document type code already exists', 'DUPLICATE_CODE');
  }

  return updateDocumentTypeRecord(id, data);
}

export async function deactivateDocumentType(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT_TYPE:DEACTIVATE',
  });

  const documentType = await findDocumentTypeById(id);

  if (!documentType) {
    throw new AppError('Document Type not found', 'DOCUMENT_TYPE_NOT_FOUND');
  }

  return deactivateDocumentTypeRecord(id);
}
