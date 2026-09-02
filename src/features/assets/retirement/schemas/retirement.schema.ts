import { z } from 'zod';

/**
 * Raw HTML form schema.
 *
 * The browser submits all form values as strings.
 */
export const retirementFormSchema = z.object({
  assetId: z.string().min(1, 'Asset is required'),

  retirementDate: z.string().min(1, 'Retirement date is required'),

  reason: z
    .string()
    .trim()
    .min(1, 'Retirement reason is required')
    .max(1000, 'Retirement reason must not exceed 1000 characters'),

  conditionId: z.string().min(1, 'Condition is required'),

  notes: z.string(),
});

export type RetirementFormValues = z.infer<typeof retirementFormSchema>;

/**
 * Validated application/domain data.
 */
export const retirementSchema = z.object({
  assetId: z.string().min(1, 'Asset is required'),

  retirementDate: z
    .string()
    .min(1, 'Retirement date is required')
    .pipe(z.coerce.date()),

  reason: z
    .string()
    .trim()
    .min(1, 'Retirement reason is required')
    .max(1000, 'Retirement reason must not exceed 1000 characters'),

  conditionId: z.string().min(1, 'Condition is required'),

  notes: z.string().transform((value) => value.trim() || undefined),
});

export type RetirementFormData = z.infer<typeof retirementSchema>;

export const cancelRetirementSchema = z.object({
  retirementId: z.string().min(1, 'Retirement is required'),

  cancellationReason: z
    .string()
    .trim()
    .min(1, 'Cancellation reason is required')
    .max(1000, 'Cancellation reason must not exceed 1000 characters'),
});

export type CancelRetirementData = z.infer<typeof cancelRetirementSchema>;
