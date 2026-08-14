import { z } from 'zod';

export const buildingTypeSchema = z.object({
  code: z
    .string()
    .min(1, 'Building Type code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Building Type name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type BuildingTypeFormData = z.infer<typeof buildingTypeSchema>;
