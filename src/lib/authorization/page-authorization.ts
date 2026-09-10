import { AppError } from '@/lib/errors';
import { requirePermission } from './authorization.service';

type PagePermissionRequest = {
  userId: string;
  permissionCode: string;
};

export async function checkPagePermission(
  request: PagePermissionRequest,
): Promise<boolean> {
  try {
    await requirePermission(request);
    return true;
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return false;
    }

    throw error;
  }
}
