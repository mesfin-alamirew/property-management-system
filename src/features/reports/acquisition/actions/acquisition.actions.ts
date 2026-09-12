'use server';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import {
  getAcquisitionDetail,
  getAcquisitionReport,
  getAcquisitionSummary,
} from '../queries/acquisition.queries';
import {
  acquisitionReportSchema,
  acquisitionSummarySchema,
} from '../schemas/acquisition.schema';

import type {
  AcquisitionDetail,
  AcquisitionReportRow,
  AcquisitionSummary,
} from '../types/acquisition.types';

export async function getAcquisitionReportAction(
  formData: unknown,
): Promise<ActionResult<AcquisitionReportRow[]>> {
  try {
    const filters = acquisitionReportSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await getAcquisitionReport(user.id, filters);

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
      message: 'Something went wrong',
    };
  }
}

export async function getAcquisitionDetailAction(
  id: string,
): Promise<ActionResult<AcquisitionDetail>> {
  try {
    const user = await requireCurrentUser();

    const acquisition = await getAcquisitionDetail(user.id, id);

    if (!acquisition) {
      return {
        success: false,
        message: 'Acquisition not found',
      };
    }

    return {
      success: true,
      data: acquisition,
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

export async function getAcquisitionSummaryAction(
  formData: unknown,
): Promise<ActionResult<AcquisitionSummary>> {
  try {
    const filters = acquisitionSummarySchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await getAcquisitionSummary(user.id, filters);

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
      message: 'Something went wrong',
    };
  }
}
