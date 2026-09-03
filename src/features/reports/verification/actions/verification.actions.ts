'use server';

import { z } from 'zod';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import { getPhysicalVerificationDetail } from '../queries/verification-detail.queries';
import { getPhysicalVerificationReport } from '../queries/verification.queries';
import { physicalVerificationReportSchema } from '../schemas/verification.schema';
import type {
  PhysicalVerificationDetail,
  PhysicalVerificationDetailItem,
  PhysicalVerificationDetailResultSummary,
  PhysicalVerificationReportRow,
  PhysicalVerificationUnregisteredObservation,
} from '../types/verification.types';

export async function getPhysicalVerificationReportAction(
  formData: unknown,
): Promise<ActionResult<PhysicalVerificationReportRow[]>> {
  try {
    const filters = physicalVerificationReportSchema.parse(formData);

    await requireCurrentUser();

    const result = await getPhysicalVerificationReport(filters);

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

const verificationIdSchema = z.string().trim().min(1);

type PhysicalVerificationDetailResult = {
  verification: PhysicalVerificationDetail;
  items: PhysicalVerificationDetailItem[];
  resultSummary: PhysicalVerificationDetailResultSummary[];
  unregisteredObservations: PhysicalVerificationUnregisteredObservation[];
};

export async function getPhysicalVerificationDetailAction(
  id: unknown,
): Promise<ActionResult<PhysicalVerificationDetailResult>> {
  try {
    const verificationId = verificationIdSchema.parse(id);

    await requireCurrentUser();

    const result = await getPhysicalVerificationDetail(verificationId);

    if (!result) {
      return {
        success: false,
        message: 'Physical verification record not found.',
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

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Invalid physical verification ID.',
      };
    }

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}
