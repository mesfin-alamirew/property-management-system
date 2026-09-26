import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findSystemSettingByKey,
  findSystemSettings,
} from '../repositories/system-setting.repository';

import type { SystemSettingKey } from '../types/system-setting.types';

export async function getSystemSettings(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'SYSTEM_SETTING:READ',
  });

  return findSystemSettings();
}

export async function getSystemSettingByKey(
  userId: string,
  key: SystemSettingKey,
) {
  await requirePermission({
    userId,
    permissionCode: 'SYSTEM_SETTING:READ',
  });

  return findSystemSettingByKey(key);
}
