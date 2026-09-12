'use server';

import { z } from 'zod';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import { getMaintenanceDetail } from '../queries/maintenance-detail.queries';
import { getMaintenanceReport } from '../queries/maintenance.queries';
import { maintenanceReportSchema } from '../schemas/maintenance.schema';
import type {
  MaintenanceDetail,
  MaintenanceReportFilters,
  MaintenanceReportRow,
} from '../types/maintenance.types';

export async function getMaintenanceReportAction(
  filters: MaintenanceReportFilters = {},
): Promise<ActionResult<MaintenanceReportRow[]>> {
  try {
    const user = await requireCurrentUser();

    const parsed = maintenanceReportSchema.parse(filters);

    const result = await getMaintenanceReport(user.id, parsed);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      };
    }

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Invalid maintenance report filters.',
      };
    }

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function getMaintenanceDetailAction(
  id: string,
): Promise<ActionResult<MaintenanceDetail>> {
  try {
    const user = await requireCurrentUser();

    const result = await getMaintenanceDetail(user.id, id);

    if (!result) {
      return {
        success: false,
        message: 'Maintenance record not found.',
      };
    }

    return {
      success: true,
      data: result,
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
      message: 'Something went wrong.',
    };
  }
}
