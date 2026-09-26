import { AccessDenied } from '@/components/ui/access-denied';
import { AppError } from '@/lib/errors';

import { getSystemSettingByKey } from '../queries/system-setting.queries';
import { SYSTEM_SETTING_KEYS } from '../types/system-setting.types';

import { SystemSettingWorkspace } from './system-setting-workspace';

type SystemSettingPageProps = {
  userId: string;
};

export async function SystemSettingPage({ userId }: SystemSettingPageProps) {
  let setting;

  try {
    setting = await getSystemSettingByKey(
      userId,
      SYSTEM_SETTING_KEYS.DOCUMENT_MAX_FILE_SIZE_MB,
    );
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  if (!setting) {
    return (
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">System Settings</h1>

        <p className="text-sm text-muted-foreground">
          The document upload setting has not been configured.
        </p>
      </div>
    );
  }

  return <SystemSettingWorkspace setting={setting} />;
}
