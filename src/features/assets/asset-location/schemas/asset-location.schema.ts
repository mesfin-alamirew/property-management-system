import { z } from 'zod';

export const assetLocationSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, 'Location code is required')
    .max(50, 'Location code must not exceed 50 characters'),

  name: z
    .string()
    .trim()
    .min(1, 'Location name is required')
    .max(100, 'Location name must not exceed 100 characters'),

  description: z
    .string()
    .trim()
    .max(500, 'Description must not exceed 500 characters')
    .optional()
    .or(z.literal('')),
});

export type AssetLocationFormData = z.infer<typeof assetLocationSchema>;
