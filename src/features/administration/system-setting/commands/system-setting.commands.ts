import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import { requirePermission } from '@/lib/authorization/authorization.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { recordAuditEvent } from '@/lib/audit/audit.service';

import {
  findSystemSettingByKey,
  updateSystemSettingRecord,
} from '../repositories/system-setting.repository';

import type { SystemSettingKey } from '../types/system-setting.types';

export async function updateSystemSetting(
  userId: string,
  key: SystemSettingKey,
  value: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'SYSTEM_SETTING:UPDATE',
  });

  const setting = await findSystemSettingByKey(key);

  if (!setting) {
    throw new AppError('System setting not found', 'SYSTEM_SETTING_NOT_FOUND');
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new AppError(
      'System setting value is required',
      'SYSTEM_SETTING_VALUE_REQUIRED',
    );
  }

  if (key === 'DOCUMENT_MAX_FILE_SIZE_MB') {
    const numericValue = Number(normalizedValue);

    if (!Number.isInteger(numericValue) || numericValue <= 0) {
      throw new AppError(
        'Document maximum file size must be a positive whole number of megabytes',
        'INVALID_DOCUMENT_MAX_FILE_SIZE',
      );
    }
  }

  return prisma.$transaction(async (tx) => {
    const updatedSetting = await updateSystemSettingRecord(
      tx,
      key,
      normalizedValue,
      userId,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.SYSTEM_SETTING_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.SYSTEM_SETTING,
      entityId: updatedSetting.id,
      description: `System setting ${updatedSetting.key} updated`,
      oldValue: {
        key: setting.key,
        value: setting.value,
      },
      newValue: {
        key: updatedSetting.key,
        value: updatedSetting.value,
      },
    });

    return updatedSetting;
  });
}
