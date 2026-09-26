import { prisma } from '@/lib/prisma';
import type { Prisma } from '@/generated/prisma/client';
import type { SystemSettingKey } from '../types/system-setting.types';

export async function findSystemSettingByKey(key: SystemSettingKey) {
  return prisma.systemSetting.findUnique({
    where: { key },
  });
}

export async function findSystemSettings() {
  return prisma.systemSetting.findMany({
    orderBy: { key: 'asc' },
  });
}

export async function updateSystemSettingRecord(
  tx: Prisma.TransactionClient,
  key: SystemSettingKey,
  value: string,
  updatedByUserId: string,
) {
  return tx.systemSetting.update({
    where: { key },
    data: {
      value,
      updatedByUserId,
    },
  });
}
