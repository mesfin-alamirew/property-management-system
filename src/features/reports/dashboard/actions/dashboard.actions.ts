'use server';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import {
  dashboardSchema,
  type DashboardInput,
} from '../schemas/dashboard.schema';
import { getDashboardData } from '../queries/dashboard.queries';
import { getDashboardLookups } from '../queries/dashboard-lookup.queries';
import type { DashboardFilters } from '../types/dashboard.types';

export type DashboardActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getDashboardDataAction(
  input: DashboardInput,
): Promise<
  DashboardActionResult<Awaited<ReturnType<typeof getDashboardData>>>
> {
  try {
    await requireCurrentUser();

    const parsed = dashboardSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        error: 'Invalid dashboard filters.',
      };
    }

    const filters: DashboardFilters = {
      organizationUnitId: parsed.data.organizationUnitId,
      assetTypeId: parsed.data.assetTypeId,
      assetStatusId: parsed.data.assetStatusId,
    };

    const data = await getDashboardData(filters);

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        error: error.message,
      };
    }

    console.error('Failed to load management dashboard:', error);

    return {
      success: false,
      error: 'Failed to load management dashboard.',
    };
  }
}

export async function getDashboardLookupsAction(): Promise<
  DashboardActionResult<Awaited<ReturnType<typeof getDashboardLookups>>>
> {
  try {
    await requireCurrentUser();

    const data = await getDashboardLookups();

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        error: error.message,
      };
    }

    console.error('Failed to load management dashboard lookups:', error);

    return {
      success: false,
      error: 'Failed to load management dashboard lookups.',
    };
  }
}
