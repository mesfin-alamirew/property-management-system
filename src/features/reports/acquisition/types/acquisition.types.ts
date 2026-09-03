export type AcquisitionReportFilters = {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  acquisitionMethodId?: string;
  supplierName?: string;
  fundingSource?: string;
  currency?: string;
};

export type AcquisitionReportRow = {
  id: string;
  acquisitionNumber: string;
  acquisitionDate: Date;

  acquisitionMethod: {
    id: string;
    code: string;
    name: string;
  };

  supplierName: string | null;
  referenceNumber: string | null;
  fundingSource: string | null;

  totalAmount: string | null;
  currency: string | null;

  itemCount: number;
};

export type AcquisitionDetailItem = {
  id: string;
  assetId: string;
  assetCode: string;
  assetName: string;

  unitCost: string | null;
  totalCost: string | null;
};

export type AcquisitionDetail = {
  id: string;
  acquisitionNumber: string;
  acquisitionDate: Date;

  acquisitionMethod: {
    id: string;
    code: string;
    name: string;
  };

  supplierName: string | null;
  referenceNumber: string | null;
  description: string | null;

  fundingSource: string | null;
  totalAmount: string | null;
  currency: string | null;
  notes: string | null;

  items: AcquisitionDetailItem[];
};
export type AcquisitionSummaryFilters = {
  dateFrom?: string;
  dateTo?: string;
};

export type AcquisitionSummaryTotals = {
  acquisitionCount: number;
  itemCount: number;
};

export type AcquisitionSummaryByMethod = {
  acquisitionMethodId: string;
  code: string;
  name: string;
  acquisitionCount: number;
  itemCount: number;
};

export type AcquisitionSummaryByFundingSource = {
  fundingSource: string;
  acquisitionCount: number;
  itemCount: number;
};

export type AcquisitionSummaryByCurrency = {
  currency: string;
  acquisitionCount: number;
  itemCount: number;
  totalAmount: string;
};

export type AcquisitionSummary = {
  totals: AcquisitionSummaryTotals;
  byMethod: AcquisitionSummaryByMethod[];
  byFundingSource: AcquisitionSummaryByFundingSource[];
  byCurrency: AcquisitionSummaryByCurrency[];
};
