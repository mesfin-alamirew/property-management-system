import { z } from 'zod';

export const propertySchema = z.object({
  propertyCode: z
    .string()
    .min(1, 'Property code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Property name is required')
    .transform((value) => value.trim()),

  displayName: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  address: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  city: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  stateProvince: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  postalCode: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  latitude: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) => value === undefined || !Number.isNaN(Number(value)),
      'Latitude must be a valid number',
    )
    .refine(
      (value) =>
        value === undefined || (Number(value) >= -90 && Number(value) <= 90),
      'Latitude must be between -90 and 90',
    ),

  longitude: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) => value === undefined || !Number.isNaN(Number(value)),
      'Longitude must be a valid number',
    )
    .refine(
      (value) =>
        value === undefined || (Number(value) >= -180 && Number(value) <= 180),
      'Longitude must be between -180 and 180',
    ),

  constructionDate: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined || !Number.isNaN(new Date(value).getTime()),
      'Construction date must be a valid date',
    ),

  grossAreaSqm: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) => value === undefined || !Number.isNaN(Number(value)),
      'Gross area must be a valid number',
    )
    .refine(
      (value) => value === undefined || Number(value) >= 0,
      'Gross area cannot be negative',
    ),

  organizationUnitId: z.string().min(1, 'Organization Unit is required'),

  propertyTypeId: z.string().min(1, 'Property Type is required'),

  propertyCategoryId: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  propertyTenureId: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  propertyStatusId: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
