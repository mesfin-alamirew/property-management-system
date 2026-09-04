'use server';

import { z } from 'zod';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import { getAssetReport } from '../queries/asset.queries';
import { assetReportSchema } from '../schemas/asset.schema';

import type {
  AssetDetail,
  AssetReportFilters,
  AssetReportRow,
} from '../types/asset.types';
import { getAssetDetail } from '../queries/asset-detail.queries';
export async function getAssetReportAction(
  formData: unknown,
): Promise<ActionResult<AssetReportRow[]>> {
  try {
    const filters = assetReportSchema.parse(formData);

    await requireCurrentUser();

    const result = await getAssetReport(filters as AssetReportFilters);

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
        message: 'Invalid asset report filters.',
      };
    }

    return {
      success: false,
      message: 'Something went wrong.',
    };
  }
}
export async function getAssetDetailAction(
  assetId: string,
): Promise<ActionResult<AssetDetail>> {
  try {
    await requireCurrentUser();

    if (!assetId) {
      return {
        success: false,
        message: 'Asset ID is required.',
      };
    }

    const result = await getAssetDetail(assetId);

    if (!result) {
      return {
        success: false,
        message: 'Asset not found.',
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
