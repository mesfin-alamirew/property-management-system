'use server';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import { getAssetReport } from '../queries/asset.queries';
import { assetReportSchema } from '../schemas/asset.schema';
import type { AssetReportRow } from '../types/asset.types';

export async function getAssetReportAction(
  formData: unknown,
): Promise<ActionResult<AssetReportRow[]>> {
  try {
    const filters = assetReportSchema.parse(formData);

    await requireCurrentUser();

    const result = await getAssetReport(filters);

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
