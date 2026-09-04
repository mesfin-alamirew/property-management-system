'use server';

import { z } from 'zod';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import { getIncidentReport } from '../queries/incident.queries';
import { incidentReportSchema } from '../schemas/incident.schema';
import type {
  IncidentDetail,
  IncidentReportFilters,
  IncidentReportRow,
} from '../types/incident.types';
import { getIncidentDetail } from '../queries/incident-detail.queries';

export async function getIncidentReportAction(
  filters: IncidentReportFilters = {},
): Promise<ActionResult<IncidentReportRow[]>> {
  try {
    await requireCurrentUser();

    const parsed = incidentReportSchema.parse(filters);

    const result = await getIncidentReport(parsed);

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
        message: 'Invalid incident report filters.',
      };
    }

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}
export async function getIncidentDetailAction(
  id: string,
): Promise<ActionResult<IncidentDetail>> {
  try {
    await requireCurrentUser();

    const result = await getIncidentDetail(id);

    if (!result) {
      return {
        success: false,
        message: 'Incident record not found.',
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
