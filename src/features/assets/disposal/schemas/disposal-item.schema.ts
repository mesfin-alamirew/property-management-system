import { z } from 'zod';

export const disposalItemSchema = z.object({
  disposalId: z.string().trim().min(1, 'Disposal is required'),

  assetId: z.string().trim().min(1, 'Asset is required'),
});

export type DisposalItemFormData = z.infer<typeof disposalItemSchema>;
