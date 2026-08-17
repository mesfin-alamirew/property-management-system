import { prisma } from '@/lib/prisma';

export async function findAllAcquisitionMethods() {
  return prisma.acquisitionMethod.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findActiveAcquisitionMethods() {
  return prisma.acquisitionMethod.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findAcquisitionMethodById(id: string) {
  return prisma.acquisitionMethod.findUnique({
    where: {
      id,
    },
  });
}

export async function findAcquisitionMethodByCode(code: string) {
  return prisma.acquisitionMethod.findUnique({
    where: {
      code,
    },
  });
}

export async function createAcquisitionMethod(data: {
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
}) {
  return prisma.acquisitionMethod.create({
    data,
  });
}

export async function updateAcquisitionMethod(
  id: string,
  data: {
    code: string;
    name: string;
    description?: string;
    isActive: boolean;
  },
) {
  return prisma.acquisitionMethod.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteAcquisitionMethod(id: string) {
  return prisma.acquisitionMethod.delete({
    where: {
      id,
    },
  });
}
