import { z } from 'zod';

export const acquisitionReportSchema = z.object({
  search: z.string().trim().optional(),

  dateFrom: z.string().optional(),

  dateTo: z.string().optional(),

  acquisitionMethodId: z.string().optional(),

  supplierName: z.string().trim().optional(),

  fundingSource: z.string().trim().optional(),

  currency: z.string().trim().optional(),
});

export type AcquisitionReportInput = z.infer<typeof acquisitionReportSchema>;
export const acquisitionSummarySchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type AcquisitionSummaryInput = z.infer<typeof acquisitionSummarySchema>;
