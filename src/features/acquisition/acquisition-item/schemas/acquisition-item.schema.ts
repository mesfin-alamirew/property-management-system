import { z } from 'zod';

export const acquisitionItemSchema = z.object({
  acquisitionId: z.string().min(1, 'Acquisition is required'),

  assetId: z.string().min(1, 'Asset is required'),

  unitCost: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  totalCost: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type AcquisitionItemFormData = z.infer<typeof acquisitionItemSchema>;
