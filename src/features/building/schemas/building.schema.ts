import { z } from 'zod';

export const buildingSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),

  buildingCode: z
    .string()
    .min(1, 'Building code is required')
    .transform((value) => value.trim().toUpperCase()),

  name: z
    .string()
    .min(1, 'Building name is required')
    .transform((value) => value.trim()),

  description: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  buildingTypeId: z.string().min(1, 'Building Type is required'),

  buildingConditionId: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  numberOfFloors: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined ||
        (Number.isInteger(Number(value)) && Number(value) >= 0),
      'Number of floors must be a valid non-negative integer',
    ),

  numberOfBasements: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined ||
        (Number.isInteger(Number(value)) && Number(value) >= 0),
      'Number of basements must be a valid non-negative integer',
    ),

  yearRenovated: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined ||
        (Number.isInteger(Number(value)) &&
          Number(value) >= 1800 &&
          Number(value) <= new Date().getFullYear()),
      'Renovation year must be a valid year',
    ),

  floorAreaSqm: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined ||
        (!Number.isNaN(Number(value)) && Number(value) >= 0),
      'Floor area must be a valid non-negative number',
    ),

  usableAreaSqm: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined ||
        (!Number.isNaN(Number(value)) && Number(value) >= 0),
      'Usable area must be a valid non-negative number',
    ),

  numberOfRooms: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined ||
        (Number.isInteger(Number(value)) && Number(value) >= 0),
      'Number of rooms must be a valid non-negative integer',
    ),

  numberOfUnits: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined ||
        (Number.isInteger(Number(value)) && Number(value) >= 0),
      'Number of units must be a valid non-negative integer',
    ),

  parkingCapacity: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine(
      (value) =>
        value === undefined ||
        (Number.isInteger(Number(value)) && Number(value) >= 0),
      'Parking capacity must be a valid non-negative integer',
    ),

  notes: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export type BuildingFormData = z.infer<typeof buildingSchema>;
