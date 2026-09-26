import { SystemSettingForm } from './system-setting-form';

import type { SystemSettingRecord } from '../types/system-setting.types';

type SystemSettingWorkspaceProps = {
  setting: SystemSettingRecord;
};

export function SystemSettingWorkspace({
  setting,
}: SystemSettingWorkspaceProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">System Settings</h2>

        <p className="text-sm text-muted-foreground">
          Configure system-wide application settings.
        </p>
      </div>

      <SystemSettingForm setting={setting} />
    </div>
  );
}
