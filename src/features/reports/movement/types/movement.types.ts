export type MovementReportFilters = {
  search?: string;
  assetId?: string;
  fromLocationId?: string;
  toLocationId?: string;
  movedByUserId?: string;
  movedDateFrom?: string;
  movedDateTo?: string;
};

export type MovementReportRow = {
  id: string;
  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };
  fromLocation: {
    id: string;
    name: string;
  } | null;
  toLocation: {
    id: string;
    name: string;
  };
  movedAt: Date;
  movedByUser: {
    id: string;
    displayName: string;
  };
  reason: string | null;
  notes: string | null;
  createdAt: Date;
};

export type MovementDetail = {
  id: string;
  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };
  fromLocation: {
    id: string;
    name: string;
  } | null;
  toLocation: {
    id: string;
    name: string;
  };
  movedAt: Date;
  movedByUser: {
    id: string;
    displayName: string;
  };
  reason: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};
