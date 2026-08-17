import { z } from 'zod';

export const acquisitionSchema = z.object({
  acquisitionDate: z.coerce.date({
    message: 'Acquisition date is required',
  }),

  acquisitionMethodId: z.string().min(1, 'Acquisition Method is required'),

  supplierName: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  referenceNumber: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  fundingSource: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  totalAmount: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  currency: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  notes: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type AcquisitionFormData = z.infer<typeof acquisitionSchema>;
