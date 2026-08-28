'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import {
  createMaintenance,
  updateMaintenance,
  requestMaintenance,
  assignMaintenance,
  approveMaintenance,
  startMaintenance,
  completeMaintenance,
} from '../commands/maintenance.commands';

import { maintenanceSchema } from '../schemas/maintenance.schema';

type MaintenanceActionData = {
  id: string;
};

export async function createMaintenanceAction(
  formData: unknown,
): Promise<ActionResult<MaintenanceActionData>> {
  try {
    const data = maintenanceSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await createMaintenance(user.id, data);

    revalidatePath('/maintenances');

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

export async function updateMaintenanceAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<MaintenanceActionData>> {
  try {
    const data = maintenanceSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await updateMaintenance(user.id, id, data);

    revalidatePath('/maintenances');
    revalidatePath(`/maintenances/${id}`);

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

export async function requestMaintenanceAction(
  maintenanceId: string,
): Promise<ActionResult<MaintenanceActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await requestMaintenance(user.id, maintenanceId);

    revalidatePath('/maintenances');
    revalidatePath(`/maintenances/${maintenanceId}`);

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
export async function approveMaintenanceAction(
  maintenanceId: string,
): Promise<ActionResult<MaintenanceActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await approveMaintenance(user.id, maintenanceId);

    revalidatePath('/maintenances');
    revalidatePath(`/maintenances/${maintenanceId}`);

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
export async function startMaintenanceAction(
  maintenanceId: string,
): Promise<ActionResult<MaintenanceActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await startMaintenance(user.id, maintenanceId);

    revalidatePath('/maintenances');
    revalidatePath(`/maintenances/${maintenanceId}`);

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
export async function completeMaintenanceAction(
  maintenanceId: string,
): Promise<ActionResult<MaintenanceActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await completeMaintenance(user.id, maintenanceId);

    revalidatePath('/maintenances');
    revalidatePath(`/maintenances/${maintenanceId}`);

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
export async function assignMaintenanceAction(
  maintenanceId: string,
  assignedToUserId: string,
): Promise<ActionResult<MaintenanceActionData>> {
  try {
    const user = await requireCurrentUser();
    console.log('ASSIGN ACTION:', {
      userId: user.id,
      maintenanceId,
      assignedToUserId,
    });

    const result = await assignMaintenance(
      user.id,
      maintenanceId,
      assignedToUserId,
    );

    revalidatePath('/maintenances');
    revalidatePath(`/maintenances/${maintenanceId}`);

    return {
      success: true,
      data: {
        id: result.id,
      },
    };
  } catch (error) {
    console.error('ASSIGN MAINTENANCE ERROR:', error);
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
