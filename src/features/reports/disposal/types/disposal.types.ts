export type DisposalReportFilters = {
  search?: string;
  status?: string;
  method?: string;
  assetId?: string;
  requestedByUserId?: string;
  approvedByUserId?: string;
  cancelledByUserId?: string;
  disposalDateFrom?: string;
  disposalDateTo?: string;
};

export type DisposalReportRow = {
  id: string;
  referenceNumber: string;
  disposalDate: Date;
  method: string;
  reason: string | null;
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

  itemCount: number;

  createdAt: Date;
};

export type DisposalDetailAsset = {
  id: string;
  assetCode: string;
  assetTag: string | null;
  name: string;
  assetType: {
    id: string;
    name: string;
  };
  status: {
    id: string;
    name: string;
  };
  condition: {
    id: string;
    name: string;
  };
};

export type DisposalDetail = {
  id: string;
  referenceNumber: string;
  disposalDate: Date;
  method: string;
  reason: string | null;
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

  items: DisposalDetailAsset[];

  createdAt: Date;
  updatedAt: Date;
};
