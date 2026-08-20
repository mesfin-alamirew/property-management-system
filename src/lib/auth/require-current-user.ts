import { AppError } from '@/lib/errors';

import { getCurrentUser } from './current-user';

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new AppError('Authentication required', 'UNAUTHENTICATED');
  }

  return user;
}
