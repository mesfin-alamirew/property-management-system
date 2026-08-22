import { z } from 'zod';

export const createPhysicalVerificationSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, 'Title is required')
      .max(200, 'Title must not exceed 200 characters'),

    scope: z.enum(
      [
        'ORGANIZATION',
        'ORGANIZATION_UNIT',
        'LOCATION',
        'ORGANIZATION_UNIT_LOCATION',
        'SELECTED_ASSETS',
      ],
      {
        message: 'Verification scope is required',
      },
    ),

    organizationUnitId: z.string().optional().or(z.literal('')),

    locationId: z.string().optional().or(z.literal('')),

    scheduledAt: z
      .string()
      .optional()
      .transform((value) => value?.trim() || undefined)
      .refine(
        (value) =>
          value === undefined || !Number.isNaN(new Date(value).getTime()),
        'Scheduled date must be a valid date',
      ),

    notes: z
      .string()
      .trim()
      .max(500, 'Notes must not exceed 500 characters')
      .optional()
      .or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (
      (data.scope === 'ORGANIZATION_UNIT' ||
        data.scope === 'ORGANIZATION_UNIT_LOCATION') &&
      !data.organizationUnitId
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Organization unit is required for this scope',
        path: ['organizationUnitId'],
      });
    }

    if (
      (data.scope === 'LOCATION' ||
        data.scope === 'ORGANIZATION_UNIT_LOCATION') &&
      !data.locationId
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Location is required for this scope',
        path: ['locationId'],
      });
    }
  });

export const verifyPhysicalVerificationItemSchema = z.object({
  observedAssetTag: z
    .string()
    .trim()
    .max(100, 'Observed asset tag must not exceed 100 characters')
    .optional()
    .or(z.literal('')),

  observedSerialNumber: z
    .string()
    .trim()
    .max(100, 'Observed serial number must not exceed 100 characters')
    .optional()
    .or(z.literal('')),

  observedEmployeeNumber: z
    .string()
    .trim()
    .max(50, 'Employee number must not exceed 50 characters')
    .optional()
    .or(z.literal('')),

  observedEmployeeName: z
    .string()
    .trim()
    .max(200, 'Employee name must not exceed 200 characters')
    .optional()
    .or(z.literal('')),

  observedLocationCode: z
    .string()
    .trim()
    .max(100, 'Location code must not exceed 100 characters')
    .optional()
    .or(z.literal('')),

  observedLocationName: z
    .string()
    .trim()
    .max(200, 'Location name must not exceed 200 characters')
    .optional()
    .or(z.literal('')),

  observedConditionCode: z
    .string()
    .trim()
    .max(100, 'Condition code must not exceed 100 characters')
    .optional()
    .or(z.literal('')),

  observedConditionName: z
    .string()
    .trim()
    .max(200, 'Condition name must not exceed 200 characters')
    .optional()
    .or(z.literal('')),

  result: z.enum(
    [
      'PENDING',
      'VERIFIED',
      'NOT_FOUND',
      'LOCATION_MISMATCH',
      'CUSTODIAN_MISMATCH',
      'CONDITION_MISMATCH',
      'IDENTIFICATION_MISMATCH',
      'MULTIPLE_DISCREPANCIES',
    ],
    {
      message: 'Verification result is required',
    },
  ),

  notes: z
    .string()
    .trim()
    .max(500, 'Notes must not exceed 500 characters')
    .optional()
    .or(z.literal('')),
});

export const createUnregisteredAssetObservationSchema = z.object({
  observedAssetTag: z
    .string()
    .trim()
    .max(100, 'Observed asset tag must not exceed 100 characters')
    .optional()
    .or(z.literal('')),

  observedSerialNumber: z
    .string()
    .trim()
    .max(100, 'Observed serial number must not exceed 100 characters')
    .optional()
    .or(z.literal('')),

  observedName: z
    .string()
    .trim()
    .min(1, 'Observed asset name is required')
    .max(200, 'Observed asset name must not exceed 200 characters'),

  observedLocationId: z.string().optional().or(z.literal('')),

  observedConditionId: z.string().optional().or(z.literal('')),

  notes: z
    .string()
    .trim()
    .max(500, 'Notes must not exceed 500 characters')
    .optional()
    .or(z.literal('')),

  observedAt: z
    .string()
    .trim()
    .min(1, 'Observation date is required')
    .refine(
      (value) => !Number.isNaN(new Date(value).getTime()),
      'Observation date must be a valid date',
    ),
});

export type CreatePhysicalVerificationFormData = z.infer<
  typeof createPhysicalVerificationSchema
>;

export type VerifyPhysicalVerificationItemFormData = z.infer<
  typeof verifyPhysicalVerificationItemSchema
>;

export type CreateUnregisteredAssetObservationFormData = z.infer<
  typeof createUnregisteredAssetObservationSchema
>;
