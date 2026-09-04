export type MaintenanceReportFilters = {
  search?: string;
  type?: string;
  status?: string;
  assetId?: string;
  assignedToUserId?: string;
  requestedDateFrom?: string;
  requestedDateTo?: string;
  scheduledDateFrom?: string;
  scheduledDateTo?: string;
};

export type MaintenanceReportRow = {
  id: string;
  referenceNumber: string;

  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };

  type: string;
  status: string;
  title: string;
  description: string | null;

  requestedAt: Date | null;
  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;

  requestedByUser: {
    id: string;
    displayName: string;
  };

  assignedToUser: {
    id: string;
    displayName: string;
  } | null;

  approvedByUser: {
    id: string;
    displayName: string;
  } | null;

  approvedAt: Date | null;

  serviceCount: number;

  totalServiceCost: string | null;

  createdAt: Date;
};

export type MaintenanceServiceHistoryRow = {
  id: string;
  serviceDate: Date;
  description: string;
  serviceProvider: string | null;
  quantity: string | null;
  unitCost: string | null;
  totalCost: string | null;
  notes: string | null;
};

export type MaintenanceDetail = {
  id: string;
  referenceNumber: string;

  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };

  type: string;
  status: string;
  title: string;
  description: string | null;

  requestedAt: Date | null;
  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;

  requestedByUser: {
    id: string;
    displayName: string;
  };

  assignedToUser: {
    id: string;
    displayName: string;
  } | null;

  approvedByUser: {
    id: string;
    displayName: string;
  } | null;

  approvedAt: Date | null;

  notes: string | null;

  services: MaintenanceServiceHistoryRow[];

  createdAt: Date;
  updatedAt: Date;
};
