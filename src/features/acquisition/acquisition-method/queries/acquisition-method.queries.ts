import { prisma } from '@/lib/prisma';

import { findActiveAcquisitionMethods } from '../repositories/acquisition-method.repository';

export async function getActiveAcquisitionMethods() {
  return findActiveAcquisitionMethods();
}

export async function getAcquisitionMethods() {
  return prisma.acquisitionMethod.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getAcquisitionMethodById(id: string) {
  return prisma.acquisitionMethod.findUnique({
    where: {
      id,
    },
  });
}

// export async function getActiveAcquisitionMethods() {
//   return prisma.acquisitionMethod.findMany({
//     where: {
//       isActive: true,
//     },
//     orderBy: {
//       name: 'asc',
//     },
//     select: {
//       id: true,
//       code: true,
//       name: true,
//     },
//   });
// }
