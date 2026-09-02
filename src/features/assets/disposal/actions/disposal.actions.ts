'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import {
  createDisposal,
  requestDisposal,
  approveDisposal,
  cancelDisposal,
} from '../commands/disposal.commands';

import {
  disposalSchema,
  cancelDisposalSchema,
} from '../schemas/disposal.schema';

type DisposalActionData = {
  id: string;
};

export async function createDisposalAction(
  formData: unknown,
): Promise<ActionResult<DisposalActionData>> {
  try {
    const data = disposalSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await createDisposal(user.id, data);

    revalidatePath('/disposals');

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

export async function requestDisposalAction(
  disposalId: string,
): Promise<ActionResult<DisposalActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await requestDisposal(user.id, disposalId);

    revalidatePath('/disposals');
    revalidatePath(`/disposals/${disposalId}`);

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

export async function approveDisposalAction(
  disposalId: string,
): Promise<ActionResult<DisposalActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await approveDisposal(user.id, disposalId);

    revalidatePath('/disposals');
    revalidatePath(`/disposals/${disposalId}`);

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

export async function cancelDisposalAction(
  formData: unknown,
): Promise<ActionResult<DisposalActionData>> {
  try {
    const data = cancelDisposalSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await cancelDisposal(
      user.id,
      data.disposalId,
      data.cancellationReason,
    );

    revalidatePath('/disposals');
    revalidatePath(`/disposals/${data.disposalId}`);

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
