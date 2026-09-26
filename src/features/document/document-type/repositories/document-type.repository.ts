import { prisma } from '@/lib/prisma';

import type { DocumentTypeFormData } from '../schemas/document-type.schema';

export async function findDocumentTypes() {
  return prisma.documentType.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findDocumentTypeById(id: string) {
  return prisma.documentType.findUnique({
    where: {
      id,
    },
  });
}

export async function findDocumentTypeByCode(code: string, excludeId?: string) {
  return prisma.documentType.findFirst({
    where: {
      code,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function createDocumentTypeRecord(data: DocumentTypeFormData) {
  return prisma.documentType.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function updateDocumentTypeRecord(
  id: string,
  data: DocumentTypeFormData,
) {
  return prisma.documentType.update({
    where: {
      id,
    },
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });
}

export async function deactivateDocumentTypeRecord(id: string) {
  return prisma.documentType.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
