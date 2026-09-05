import { prisma } from '@/lib/prisma';
import type {
  AccountabilityExceptionSeverity,
  AccountabilityExceptionType,
} from '../types/accountability.types';

export async function getAccountabilityReportLookups() {
  const [organizationUnits, locations, assetTypes, assetStatuses] =
    await Promise.all([
      prisma.organizationUnit.findMany({
        orderBy: {
          name: 'asc',
        },
        select: {
          id: true,
          code: true,
          name: true,
        },
      }),

      prisma.assetLocation.findMany({
        orderBy: {
          name: 'asc',
        },
        select: {
          id: true,
          code: true,
          name: true,
        },
      }),

      prisma.assetType.findMany({
        orderBy: {
          name: 'asc',
        },
        select: {
          id: true,
          code: true,
          name: true,
        },
      }),

      prisma.assetStatus.findMany({
        orderBy: {
          name: 'asc',
        },
        select: {
          id: true,
          code: true,
          name: true,
        },
      }),
    ]);

  const exceptionTypes: Array<{
    value: AccountabilityExceptionType;
    label: string;
  }> = [
    {
      value: 'NO_CURRENT_ASSIGNMENT',
      label: 'No Current Assignment',
    },
    {
      value: 'MULTIPLE_CURRENT_ASSIGNMENTS',
      label: 'Multiple Current Assignments',
    },
    {
      value: 'MISSING_LOCATION',
      label: 'Missing Location',
    },
    {
      value: 'VERIFICATION_NOT_FOUND',
      label: 'Verification Not Found',
    },
    {
      value: 'VERIFICATION_LOCATION_MISMATCH',
      label: 'Verification Location Mismatch',
    },
    {
      value: 'VERIFICATION_CUSTODIAN_MISMATCH',
      label: 'Verification Custodian Mismatch',
    },
    {
      value: 'VERIFICATION_CONDITION_MISMATCH',
      label: 'Verification Condition Mismatch',
    },
    {
      value: 'VERIFICATION_IDENTIFICATION_MISMATCH',
      label: 'Verification Identification Mismatch',
    },
    {
      value: 'VERIFICATION_MULTIPLE_DISCREPANCIES',
      label: 'Verification Multiple Discrepancies',
    },
    {
      value: 'MAINTENANCE_REQUIRING_ACTION',
      label: 'Maintenance Requiring Action',
    },
    {
      value: 'ACTIVE_INCIDENT',
      label: 'Active Incident',
    },
    {
      value: 'RETIREMENT_PENDING',
      label: 'Retirement Pending',
    },
    {
      value: 'RETIREMENT_APPROVED',
      label: 'Retirement Approved',
    },
    {
      value: 'DISPOSAL_PENDING',
      label: 'Disposal Pending',
    },
    {
      value: 'DISPOSAL_APPROVED',
      label: 'Disposal Approved',
    },
  ];

  const severities: Array<{
    value: AccountabilityExceptionSeverity;
    label: string;
  }> = [
    {
      value: 'HIGH',
      label: 'High',
    },
    {
      value: 'REVIEW',
      label: 'Review',
    },
    {
      value: 'MONITOR',
      label: 'Monitor',
    },
  ];

  return {
    organizationUnits,
    locations,
    assetTypes,
    assetStatuses,
    exceptionTypes,
    severities,
  };
}
