import { z } from 'zod';

const incidentTypeSchema = z.enum([
  'DAMAGE',
  'LOSS',
  'THEFT',
  'ACCIDENT',
  'MALFUNCTION',
  'SECURITY',
  'OTHER',
]);

const incidentSeveritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

/**
 * Raw form schema.
 *
 * HTML select and datetime-local fields submit strings.
 * Empty strings are rejected here for required fields.
 */
export const incidentFormSchema = z.object({
  assetId: z.string().min(1, 'Asset is required'),

  type: z.string().min(1, 'Incident type is required'),

  severity: z.string().min(1, 'Incident severity is required'),

  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must not exceed 200 characters'),

  description: z.string(),

  incidentDate: z.string().min(1, 'Incident date is required'),

  notes: z.string(),
});

export type IncidentFormValues = z.infer<typeof incidentFormSchema>;

/**
 * Domain/application schema.
 *
 * Converts the validated form data into the types required
 * by the Incident model and commands.
 */
export const incidentSchema = z.object({
  assetId: z.string().min(1, 'Asset is required'),

  type: incidentTypeSchema,

  severity: incidentSeveritySchema,

  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must not exceed 200 characters'),

  description: z.string().transform((value) => value.trim() || undefined),

  incidentDate: z
    .string()
    .min(1, 'Incident date is required')
    .pipe(z.coerce.date()),

  notes: z.string().transform((value) => value.trim() || undefined),
});

export type IncidentFormData = z.infer<typeof incidentSchema>;
