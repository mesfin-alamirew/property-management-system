'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import {
  createRetirement,
  requestRetirement,
  approveRetirement,
  cancelRetirement,
} from '../commands/retirement.commands';

import {
  retirementSchema,
  cancelRetirementSchema,
} from '../schemas/retirement.schema';

type RetirementActionData = {
  id: string;
};

export async function createRetirementAction(
  formData: unknown,
): Promise<ActionResult<RetirementActionData>> {
  try {
    const data = retirementSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await createRetirement(user.id, data);

    revalidatePath('/retirements');

    return {
      success: true,
      data: {
        id: result.id,
      },
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

export async function requestRetirementAction(
  retirementId: string,
): Promise<ActionResult<RetirementActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await requestRetirement(user.id, retirementId);

    revalidatePath('/retirements');
    revalidatePath(`/retirements/${retirementId}`);

    return {
      success: true,
      data: {
        id: result.id,
      },
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
export async function approveRetirementAction(
  retirementId: string,
): Promise<ActionResult<RetirementActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await approveRetirement(user.id, retirementId);

    revalidatePath('/retirements');
    revalidatePath(`/retirements/${retirementId}`);

    return {
      success: true,
      data: {
        id: result.id,
      },
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
export async function cancelRetirementAction(
  formData: unknown,
): Promise<ActionResult<RetirementActionData>> {
  try {
    const data = cancelRetirementSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await cancelRetirement(
      user.id,
      data.retirementId,
      data.cancellationReason,
    );

    revalidatePath('/retirements');
    revalidatePath(`/retirements/${data.retirementId}`);

    return {
      success: true,
      data: {
        id: result.id,
      },
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
