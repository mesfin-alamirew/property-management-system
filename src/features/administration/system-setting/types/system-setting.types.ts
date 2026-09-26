export const SYSTEM_SETTING_KEYS = {
  DOCUMENT_MAX_FILE_SIZE_MB: 'DOCUMENT_MAX_FILE_SIZE_MB',
} as const;

export type SystemSettingKey =
  (typeof SYSTEM_SETTING_KEYS)[keyof typeof SYSTEM_SETTING_KEYS];

export type SystemSettingRecord = {
  id: string;
  key: string;
  value: string;
  description: string | null;
  updatedByUserId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateSystemSettingInput = {
  key: SystemSettingKey;
  value: string;
};
