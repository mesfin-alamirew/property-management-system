import { z } from 'zod';

export const woredaSchema = z.object({
  zoneId: z.string().min(1, 'Zone is required'),

  code: z
    .string()
    .min(1, 'Code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Name is required')
    .transform((value) => value.trim()),
});

export type WoredaFormData = z.infer<typeof woredaSchema>;
