import { z } from 'zod';

export const assetReportSchema = z.object({
  search: z.string().trim().optional(),

  assetTypeId: z.string().optional(),

  statusId: z.string().optional(),

  conditionId: z.string().optional(),
});

export type AssetReportInput = z.infer<typeof assetReportSchema>;
