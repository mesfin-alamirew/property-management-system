import { z } from 'zod';

export const disposalReportSchema = z.object({
  search: z.string().trim().optional(),
  status: z.string().optional(),
  method: z.string().optional(),
  assetId: z.string().optional(),
  requestedByUserId: z.string().optional(),
  approvedByUserId: z.string().optional(),
  cancelledByUserId: z.string().optional(),
  disposalDateFrom: z.string().optional(),
  disposalDateTo: z.string().optional(),
});

export type DisposalReportInput = z.infer<typeof disposalReportSchema>;
