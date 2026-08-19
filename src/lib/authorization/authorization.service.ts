import { AppError } from '@/lib/errors';

import { hasPermission } from './authorization.repository';

import type {
  AuthorizationRequest,
  AuthorizationResult,
} from './authorization.types';

export async function authorize(
  request: AuthorizationRequest,
): Promise<AuthorizationResult> {
  const allowed = await hasPermission(request.userId, request.permissionCode);

  return {
    allowed,
  };
}

export async function requirePermission(
  request: AuthorizationRequest,
): Promise<void> {
  const result = await authorize(request);

  if (!result.allowed) {
    throw new AppError(
      'You do not have permission to perform this action',
      'PERMISSION_DENIED',
    );
  }
}
