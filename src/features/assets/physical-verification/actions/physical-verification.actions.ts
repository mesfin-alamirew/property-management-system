'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import {
  createPhysicalVerification,
  generatePhysicalVerificationItems,
  verifyPhysicalVerificationItem,
  createUnregisteredAssetObservation,
} from '../commands/physical-verification.commands';

import {
  createPhysicalVerificationSchema,
  verifyPhysicalVerificationItemSchema,
  createUnregisteredAssetObservationSchema,
} from '../schemas/physical-verification.schema';

type PhysicalVerificationActionData = {
  id: string;
};

export async function createPhysicalVerificationAction(
  formData: unknown,
): Promise<ActionResult<PhysicalVerificationActionData>> {
  try {
    const data = createPhysicalVerificationSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await createPhysicalVerification(user.id, data);

    revalidatePath('/physical-verifications');

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

export async function generatePhysicalVerificationItemsAction(
  verificationId: string,
): Promise<ActionResult<{ verificationId: string; itemCount: number }>> {
  try {
    const user = await requireCurrentUser();

    // Keep authorization available for future policy checks.
    // The command remains responsible for the business operation.
    void user;

    const result = await generatePhysicalVerificationItems(verificationId);

    revalidatePath('/physical-verifications');
    revalidatePath(`/physical-verifications/${verificationId}`);

    return {
      success: true,
      data: {
        verificationId: result.verificationId,
        itemCount: result.itemCount,
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

export async function verifyPhysicalVerificationItemAction(
  itemId: string,
  formData: unknown,
): Promise<ActionResult<PhysicalVerificationActionData>> {
  try {
    const data = verifyPhysicalVerificationItemSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await verifyPhysicalVerificationItem(user.id, itemId, data);

    revalidatePath('/physical-verifications');

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

export async function createUnregisteredAssetObservationAction(
  verificationId: string,
  formData: unknown,
): Promise<ActionResult<PhysicalVerificationActionData>> {
  try {
    const data = createUnregisteredAssetObservationSchema.parse(formData);

    const user = await requireCurrentUser();

    const result = await createUnregisteredAssetObservation(
      user.id,
      verificationId,
      data,
    );

    revalidatePath('/physical-verifications');

    revalidatePath(`/physical-verifications/${verificationId}`);

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
