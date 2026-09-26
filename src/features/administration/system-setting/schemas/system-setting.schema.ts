import { z } from 'zod';

import { SYSTEM_SETTING_KEYS } from '../types/system-setting.types';

export const updateSystemSettingSchema = z.object({
  key: z.enum([SYSTEM_SETTING_KEYS.DOCUMENT_MAX_FILE_SIZE_MB]),
  value: z.string().trim().min(1, 'Setting value is required'),
});

export type UpdateSystemSettingFormData = z.infer<
  typeof updateSystemSettingSchema
>;
