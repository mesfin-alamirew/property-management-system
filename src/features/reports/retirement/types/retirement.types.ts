export type RetirementReportFilters = {
  search?: string;
  status?: string;
  assetId?: string;
  conditionId?: string;
  requestedByUserId?: string;
  approvedByUserId?: string;
  cancelledByUserId?: string;
  retirementDateFrom?: string;
  retirementDateTo?: string;
};

export type RetirementReportRow = {
  id: string;
  referenceNumber: string;
  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };
  retirementDate: Date;
  reason: string;
  condition: {
    id: string;
    name: string;
  };
  status: string;
  requestedByUser: {
    id: string;
    displayName: string;
  };
  approvedByUser: {
    id: string;
    displayName: string;
  } | null;
  approvedAt: Date | null;
  cancelledByUser: {
    id: string;
    displayName: string;
  } | null;
  cancelledAt: Date | null;
  cancellationReason: string | null;
  createdAt: Date;
};

export type RetirementDetail = {
  id: string;
  referenceNumber: string;
  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };
  retirementDate: Date;
  reason: string;
  condition: {
    id: string;
    name: string;
  };
  status: string;
  requestedByUser: {
    id: string;
    displayName: string;
  };
  approvedByUser: {
    id: string;
    displayName: string;
  } | null;
  approvedAt: Date | null;
  cancelledByUser: {
    id: string;
    displayName: string;
  } | null;
  cancelledAt: Date | null;
  cancellationReason: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};
