'use server';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import { getAssignmentReport } from '../queries/assignment.queries';
import { assignmentReportSchema } from '../schemas/assignment.schema';

import {
  getAssignmentDetail,
  getAssignmentHistory,
} from '../queries/assignment-detail.queries';

import type {
  AssignmentDetail,
  AssignmentHistoryRow,
  AssignmentReportRow,
} from '../types/assignment.types';

export async function getAssignmentReportAction(
  formData: unknown,
): Promise<ActionResult<AssignmentReportRow[]>> {
  try {
    const filters = assignmentReportSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await getAssignmentReport(user.id, filters);

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

export async function getAssignmentDetailAction(
  id: string,
): Promise<ActionResult<AssignmentDetail>> {
  try {
    const user = await requireCurrentUser();

    const result = await getAssignmentDetail(user.id, id);

    if (!result) {
      return {
        success: false,
        message: 'Assignment not found',
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
      message: 'Something went wrong',
    };
  }
}

export async function getAssignmentHistoryAction(
  assetId: string,
): Promise<ActionResult<AssignmentHistoryRow[]>> {
  try {
    const user = await requireCurrentUser();

    const result = await getAssignmentHistory(user.id, assetId);

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
