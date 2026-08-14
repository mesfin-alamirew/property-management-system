import { z } from 'zod';

import { OrganizationUnitType } from '@/generated/prisma/client';

export const organizationUnitSchema = z.object({
  code: z
    .string()
    .min(1, 'Code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  type: z
    .union([
      z.literal(''),
      z.enum([
        'HEADQUARTERS',
        'REGIONAL_OFFICE',
        'COUNTRY_OFFICE',
        'LIAISON_OFFICE',
        'PROJECT_OFFICE',
        'FIELD_OFFICE',
      ]),
    ])
    .refine((value) => value !== '', {
      message: 'Organization Unit Type is required',
    }),

  countryId: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  parentId: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type OrganizationUnitFormData = z.infer<typeof organizationUnitSchema>;
