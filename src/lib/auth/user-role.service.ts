import { hasActiveRole } from './user-role.repository';

export async function userHasActiveRole(userId: string): Promise<boolean> {
  return hasActiveRole(userId);
}
