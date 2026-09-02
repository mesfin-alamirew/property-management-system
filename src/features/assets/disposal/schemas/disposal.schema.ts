import { z } from 'zod';

export const disposalSchema = z.object({
  disposalDate: z.coerce.date({
    message: 'Disposal date is required',
  }),

  method: z.string().trim().min(1, 'Disposal method is required'),

  reason: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),

  notes: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
});

export const cancelDisposalSchema = z.object({
  disposalId: z.string().min(1, 'Disposal is required'),

  cancellationReason: z
    .string()
    .trim()
    .min(1, 'Cancellation reason is required'),
});

export type DisposalFormInput = z.input<typeof disposalSchema>;

export type DisposalFormData = z.output<typeof disposalSchema>;

export type CancelDisposalFormData = z.infer<typeof cancelDisposalSchema>;
