'use server';

import { z } from 'zod';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import { getMovementDetail } from '../queries/movement-detail.queries';
import { getMovementReport } from '../queries/movement.queries';
import { movementReportSchema } from '../schemas/movement.schema';
import type {
  MovementDetail,
  MovementReportFilters,
  MovementReportRow,
} from '../types/movement.types';

export async function getMovementReportAction(
  filters: MovementReportFilters = {},
): Promise<ActionResult<MovementReportRow[]>> {
  try {
    await requireCurrentUser();

    const parsed = movementReportSchema.parse(filters);

    const result = await getMovementReport(parsed);

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
        message: 'Invalid movement report filters.',
      };
    }

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function getMovementDetailAction(
  id: string,
): Promise<ActionResult<MovementDetail>> {
  try {
    await requireCurrentUser();

    if (!id) {
      return {
        success: false,
        message: 'Movement record ID is required.',
      };
    }

    const result = await getMovementDetail(id);

    if (!result) {
      return {
        success: false,
        message: 'Movement record not found.',
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
