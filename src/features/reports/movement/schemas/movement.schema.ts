import { z } from 'zod';

export const movementReportSchema = z.object({
  search: z.string().trim().optional(),
  assetId: z.string().optional(),
  fromLocationId: z.string().optional(),
  toLocationId: z.string().optional(),
  movedByUserId: z.string().optional(),
  movedDateFrom: z.string().optional(),
  movedDateTo: z.string().optional(),
});

export type MovementReportInput = z.infer<typeof movementReportSchema>;
