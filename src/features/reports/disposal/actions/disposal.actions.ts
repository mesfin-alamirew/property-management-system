'use server';

import { z } from 'zod';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import { getDisposalReport } from '../queries/disposal.queries';
import { disposalReportSchema } from '../schemas/disposal.schema';
import type {
  DisposalDetail,
  DisposalReportFilters,
  DisposalReportRow,
} from '../types/disposal.types';
import { getDisposalDetail } from '../queries/disposal-detail.queries';

export async function getDisposalReportAction(
  filters: DisposalReportFilters = {},
): Promise<ActionResult<DisposalReportRow[]>> {
  try {
    await requireCurrentUser();

    const parsed = disposalReportSchema.parse(filters);

    const result = await getDisposalReport(parsed);

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
        message: 'Invalid disposal report filters.',
      };
    }

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}
export async function getDisposalDetailAction(
  id: string,
): Promise<ActionResult<DisposalDetail>> {
  try {
    await requireCurrentUser();

    if (!id) {
      return {
        success: false,
        message: 'Disposal record ID is required.',
      };
    }

    const result = await getDisposalDetail(id);

    if (!result) {
      return {
        success: false,
        message: 'Disposal record not found.',
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
