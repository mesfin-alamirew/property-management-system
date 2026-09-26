import { requirePermission } from '@/lib/authorization/authorization.service';

import { prisma } from '@/lib/prisma';

export async function getDocumentTypes(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT_TYPE:READ',
  });

  const documentTypes = await prisma.documentType.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return documentTypes;
}
