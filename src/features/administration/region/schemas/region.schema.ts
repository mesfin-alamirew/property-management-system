import { z } from 'zod';

export const regionSchema = z.object({
  countryId: z.string().min(1),

  code: z
    .string()
    .min(1)
    .transform((value) => value.toUpperCase()),

  name: z.string().min(1),
});

export type RegionFormData = z.infer<typeof regionSchema>;
