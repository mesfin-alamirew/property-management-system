import { z } from 'zod';

export const retirementReportSchema = z.object({
  search: z.string().trim().optional(),
  status: z.string().optional(),
  assetId: z.string().optional(),
  conditionId: z.string().optional(),
  requestedByUserId: z.string().optional(),
  approvedByUserId: z.string().optional(),
  cancelledByUserId: z.string().optional(),
  retirementDateFrom: z.string().optional(),
  retirementDateTo: z.string().optional(),
});

export type RetirementReportInput = z.infer<typeof retirementReportSchema>;
