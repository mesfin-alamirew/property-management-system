import { z } from 'zod';

export const zoneSchema = z.object({
  regionId: z.string().min(1, 'Region is required'),

  code: z
    .string()
    .min(1, 'Code is required')
    .transform((value) => value.toUpperCase().trim()),

  name: z
    .string()
    .min(1, 'Name is required')
    .transform((value) => value.trim()),
});

export type ZoneFormData = z.infer<typeof zoneSchema>;
