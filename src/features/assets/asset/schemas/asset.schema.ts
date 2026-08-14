import { z } from 'zod';

export const assetSchema = z.object({
  assetTag: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  name: z
    .string()
    .min(1, 'Asset name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  manufacturer: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  model: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  serialNumber: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  assetTypeId: z.string().min(1, 'Asset Type is required'),

  statusId: z.string().min(1, 'Asset Status is required'),

  conditionId: z.string().min(1, 'Asset Condition is required'),
});

export type AssetFormData = z.infer<typeof assetSchema>;
