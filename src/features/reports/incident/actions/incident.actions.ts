'use server';

import { z } from 'zod';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import { getIncidentDetail } from '../queries/incident-detail.queries';
import { getIncidentReport } from '../queries/incident.queries';
import { incidentReportSchema } from '../schemas/incident.schema';
import type {
  IncidentDetail,
  IncidentReportFilters,
  IncidentReportRow,
} from '../types/incident.types';

export async function getIncidentReportAction(
  filters: IncidentReportFilters = {},
): Promise<ActionResult<IncidentReportRow[]>> {
  try {
    const user = await requireCurrentUser();

    const parsed = incidentReportSchema.parse(filters);

    const result = await getIncidentReport(user.id, parsed);

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
    const user = await requireCurrentUser();

    const result = await getIncidentDetail(user.id, id);

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
