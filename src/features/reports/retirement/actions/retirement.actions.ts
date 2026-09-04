'use server';

import { z } from 'zod';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import { getRetirementDetail } from '../queries/retirement-detail.queries';
import { getRetirementReport } from '../queries/retirement.queries';
import { retirementReportSchema } from '../schemas/retirement.schema';
import type {
  RetirementDetail,
  RetirementReportFilters,
  RetirementReportRow,
} from '../types/retirement.types';

export async function getRetirementReportAction(
  filters: RetirementReportFilters = {},
): Promise<ActionResult<RetirementReportRow[]>> {
  try {
    await requireCurrentUser();

    const parsed = retirementReportSchema.parse(filters);

    const result = await getRetirementReport(parsed);

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
        message: 'Invalid retirement report filters.',
      };
    }

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function getRetirementDetailAction(
  id: string,
): Promise<ActionResult<RetirementDetail>> {
  try {
    await requireCurrentUser();

    if (!id) {
      return {
        success: false,
        message: 'Retirement record ID is required.',
      };
    }

    const result = await getRetirementDetail(id);

    if (!result) {
      return {
        success: false,
        message: 'Retirement record not found.',
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
