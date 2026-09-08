'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import { requireCurrentUser } from '@/lib/auth/require-current-user';

import {
  createRole,
  updateRole,
  deactivateRole,
  activateRole,
} from '../commands/role.commands';

import {
  addPermissionToRole,
  removePermissionFromRole,
} from '../commands/role-permission.commands';

import {
  assignRoleToUser,
  removeRoleFromUser,
} from '../commands/user-role.commands';

import { roleSchema, updateRoleSchema } from '../schemas/role.schema';

type RoleActionData = {
  id: string;
};

type RolePermissionActionData = {
  roleId: string;
  permissionId: string;
};

type UserRoleActionData = {
  userId: string;
  roleId: string;
};

export async function createRoleAction(
  formData: unknown,
): Promise<ActionResult<RoleActionData>> {
  try {
    const data = roleSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await createRole(user.id, data);

    revalidatePath('/administration/roles');

    return {
      success: true,
      data: {
        id: result.id,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}

export async function updateRoleAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<RoleActionData>> {
  try {
    const data = updateRoleSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await updateRole(user.id, id, data);

    revalidatePath('/administration/roles');

    return {
      success: true,
      data: {
        id: result.id,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}
export async function activateRoleAction(
  id: string,
): Promise<ActionResult<null>> {
  try {
    const user = await requireCurrentUser();

    await activateRole(user.id, id);

    revalidatePath('/administration/roles');

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}
export async function deactivateRoleAction(
  id: string,
): Promise<ActionResult<RoleActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateRole(user.id, id);

    revalidatePath('/administration/roles');

    return {
      success: true,
      data: {
        id: result.id,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}

export async function addPermissionToRoleAction(
  roleId: string,
  permissionId: string,
): Promise<ActionResult<RolePermissionActionData>> {
  try {
    const user = await requireCurrentUser();

    await addPermissionToRole(user.id, roleId, permissionId);

    revalidatePath('/administration/roles');

    return {
      success: true,
      data: {
        roleId,
        permissionId,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}

export async function removePermissionFromRoleAction(
  roleId: string,
  permissionId: string,
): Promise<ActionResult<RolePermissionActionData>> {
  try {
    const user = await requireCurrentUser();

    await removePermissionFromRole(user.id, roleId, permissionId);

    revalidatePath('/administration/roles');

    return {
      success: true,
      data: {
        roleId,
        permissionId,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}

export async function assignRoleToUserAction(
  targetUserId: string,
  roleId: string,
): Promise<ActionResult<UserRoleActionData>> {
  try {
    const user = await requireCurrentUser();

    await assignRoleToUser(user.id, targetUserId, roleId);

    revalidatePath('/administration/roles');

    return {
      success: true,
      data: {
        userId: targetUserId,
        roleId,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}

export async function removeRoleFromUserAction(
  targetUserId: string,
  roleId: string,
): Promise<ActionResult<UserRoleActionData>> {
  try {
    const user = await requireCurrentUser();

    await removeRoleFromUser(user.id, targetUserId, roleId);

    revalidatePath('/administration/roles');

    return {
      success: true,
      data: {
        userId: targetUserId,
        roleId,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}
