'use server';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import {
  accountabilityReportSchema,
  type AccountabilityReportInput,
} from '../schemas/accountability.schema';
import { getAccountabilityReport } from '../queries/accountability.queries';
import { getAccountabilityReportLookups } from '../queries/accountability-lookup.queries';
import type { AccountabilityReportFilters } from '../types/accountability.types';

export type AccountabilityActionResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export async function getAccountabilityReportAction(
  input: AccountabilityReportInput,
): Promise<
  AccountabilityActionResult<
    Awaited<ReturnType<typeof getAccountabilityReport>>
  >
> {
  try {
    await requireCurrentUser();

    const parsed = accountabilityReportSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        error: 'Invalid accountability report filters.',
      };
    }

    const filters: AccountabilityReportFilters = {
      search: parsed.data.search,
      exceptionType: parsed.data
        .exceptionType as AccountabilityReportFilters['exceptionType'],
      severity: parsed.data.severity as AccountabilityReportFilters['severity'],
      organizationUnitId: parsed.data.organizationUnitId,
      locationId: parsed.data.locationId,
      assetTypeId: parsed.data.assetTypeId,
      assetStatusId: parsed.data.assetStatusId,
    };

    const data = await getAccountabilityReport(filters);

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

    console.error('Failed to load accountability report:', error);

    return {
      success: false,
      error: 'Failed to load accountability report.',
    };
  }
}

export async function getAccountabilityReportLookupsAction(): Promise<
  AccountabilityActionResult<
    Awaited<ReturnType<typeof getAccountabilityReportLookups>>
  >
> {
  try {
    await requireCurrentUser();

    const data = await getAccountabilityReportLookups();

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

    console.error('Failed to load accountability report lookups:', error);

    return {
      success: false,
      error: 'Failed to load accountability report lookups.',
    };
  }
}
