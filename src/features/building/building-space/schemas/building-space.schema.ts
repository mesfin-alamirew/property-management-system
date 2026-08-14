import { z } from 'zod';

export const buildingSpaceSchema = z.object({
  buildingId: z.string().min(1, 'Building is required'),

  spaceTypeId: z.string().min(1, 'Space type is required'),

  code: z
    .string()
    .min(1, 'Space code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Space name is required')
    .transform((value) => value.trim()),

  floorNumber: z.string().optional().or(z.literal('')),

  areaSqm: z.string().optional().or(z.literal('')),

  capacity: z.string().optional().or(z.literal('')),

  notes: z.string().optional().or(z.literal('')),
});

export type BuildingSpaceFormData = z.output<typeof buildingSpaceSchema>;
