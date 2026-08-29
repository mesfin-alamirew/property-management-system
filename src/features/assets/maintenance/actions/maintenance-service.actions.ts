'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';

import { requireCurrentUser } from '@/lib/auth/require-current-user';

import type { ActionResult } from '@/types/action-result';

import {
  createMaintenanceService,
  updateMaintenanceService,
  deleteMaintenanceService,
} from '../commands/maintenance-service.commands';

import type { MaintenanceServiceFormData } from '../schemas/maintenance-service.schema';

export async function createMaintenanceServiceAction(
  data: MaintenanceServiceFormData,
): Promise<ActionResult<{ id: string }>> {
  try {
    const user = await requireCurrentUser();

    const service = await createMaintenanceService(user.id, data);

    revalidatePath('/maintenances');
    revalidatePath('/assets/maintenance/services');

    return {
      success: true,
      data: {
        id: service.id,
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
      message: 'Failed to create maintenance service',
    };
  }
}
export async function updateMaintenanceServiceAction(
  id: string,
  data: MaintenanceServiceFormData,
): Promise<ActionResult<{ id: string }>> {
  try {
    const user = await requireCurrentUser();

    const service = await updateMaintenanceService(user.id, id, data);

    revalidatePath('/maintenances');
    revalidatePath('/assets/maintenance/services');

    return {
      success: true,
      data: {
        id: service.id,
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
      message: 'Failed to update maintenance service',
    };
  }
}
export async function deleteMaintenanceServiceAction(
  id: string,
): Promise<ActionResult<{ id: string }>> {
  try {
    const user = await requireCurrentUser();

    const service = await deleteMaintenanceService(user.id, id);

    revalidatePath('/maintenances');
    revalidatePath('/assets/maintenance/services');

    return {
      success: true,
      data: {
        id: service.id,
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
      message: 'Failed to delete maintenance service',
    };
  }
}
