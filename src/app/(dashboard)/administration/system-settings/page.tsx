import { requireCurrentUser } from '@/lib/auth/require-current-user';

import { SystemSettingPage } from '@/features/administration/system-setting/components/system-setting-page';

export default async function SystemSettingsRoute() {
  const user = await requireCurrentUser();

  return <SystemSettingPage userId={user.id} />;
}
