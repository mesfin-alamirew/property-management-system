'use server';

import { z } from 'zod';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import { getAuditDetail } from '../queries/audit-detail.queries';
import { getAuditReport } from '../queries/audit.queries';
import { auditReportSchema } from '../schemas/audit.schema';
import type {
  AuditDetail,
  AuditReportFilters,
  AuditReportRow,
} from '../types/audit.types';

export async function getAuditReportAction(
  filters: AuditReportFilters = {},
): Promise<ActionResult<AuditReportRow[]>> {
  try {
    await requireCurrentUser();

    const parsed = auditReportSchema.parse(filters);

    const result = await getAuditReport(parsed);

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
        message: 'Invalid audit report filters.',
      };
    }

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}

export async function getAuditDetailAction(
  id: string,
): Promise<ActionResult<AuditDetail>> {
  try {
    await requireCurrentUser();

    if (!id) {
      return {
        success: false,
        message: 'Audit log ID is required.',
      };
    }

    const result = await getAuditDetail(id);

    if (!result) {
      return {
        success: false,
        message: 'Audit log not found.',
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
