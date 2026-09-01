
import { z } from 'zod';

/**
 * Raw HTML form schema.
 *
 * The form submits strings, including values from:
 * - select fields
 * - textarea fields
 */
export const incidentResolutionFormSchema = z.object({
  incidentId: z.string().min(1, 'Incident is required'),

  rootCause: z
    .string()
    .trim()
    .min(1, 'Root cause is required'),

  resolution: z
    .string()
    .trim()
    .min(1, 'Resolution is required'),

  correctiveAction: z.string(),

  notes: z.string(),
});

export type IncidentResolutionFormValues = z.infer<
  typeof incidentResolutionFormSchema
>;

/**
 * Validated application/domain data.
 *
 * Empty optional text fields are converted to undefined.
 */
export const incidentResolutionSchema = z.object({
  incidentId: z.string().min(1, 'Incident is required'),

  rootCause: z
    .string()
    .trim()
    .min(1, 'Root cause is required'),

  resolution: z
    .string()
    .trim()
    .min(1, 'Resolution is required'),

  correctiveAction: z
    .string()
    .transform((value) => value.trim() || undefined),

  notes: z
    .string()
    .transform((value) => value.trim() || undefined),
});

export type IncidentResolutionFormData = z.infer<
  typeof incidentResolutionSchema
>;

