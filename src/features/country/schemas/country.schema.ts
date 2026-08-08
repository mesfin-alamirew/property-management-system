import { z } from 'zod';

export const countrySchema = z.object({
  code: z
    .string()
    .min(2, 'Code must be at least 2 characters')
    .max(10, 'Code cannot exceed 10 characters')
    .transform((value) => value.toUpperCase()),

  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
});

export type CountryFormData = z.infer<typeof countrySchema>;
