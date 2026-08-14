import { z } from 'zod';

export const buildingSpaceTypeSchema = z.object({
  code: z
    .string()
    .min(1, 'Space type code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Space type name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type BuildingSpaceTypeFormData = z.infer<typeof buildingSpaceTypeSchema>;
