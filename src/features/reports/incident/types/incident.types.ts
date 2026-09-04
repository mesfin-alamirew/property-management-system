export type IncidentReportFilters = {
  search?: string;
  type?: string;
  severity?: string;
  status?: string;
  assetId?: string;
  reportedByUserId?: string;
  assignedToUserId?: string;
  incidentDateFrom?: string;
  incidentDateTo?: string;
  reportedDateFrom?: string;
  reportedDateTo?: string;
};

export type IncidentReportRow = {
  id: string;
  referenceNumber: string;

  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };

  type: string;
  severity: string;
  status: string;
  title: string;
  description: string | null;

  incidentDate: Date;
  reportedAt: Date | null;
  assignedAt: Date | null;
  startedAt: Date | null;
  resolvedAt: Date | null;
  closedAt: Date | null;

  reportedByUser: {
    id: string;
    displayName: string;
  };

  assignedToUser: {
    id: string;
    displayName: string;
  } | null;

  hasResolution: boolean;

  createdAt: Date;
};

export type IncidentResolutionDetail = {
  id: string;
  rootCause: string;
  resolution: string;
  correctiveAction: string | null;
  resolvedByUser: {
    id: string;
    displayName: string;
  };
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IncidentDetail = {
  id: string;
  referenceNumber: string;

  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };

  type: string;
  severity: string;
  status: string;
  title: string;
  description: string | null;

  incidentDate: Date;
  reportedAt: Date | null;
  assignedAt: Date | null;
  startedAt: Date | null;
  resolvedAt: Date | null;
  closedAt: Date | null;

  reportedByUser: {
    id: string;
    displayName: string;
  };

  assignedToUser: {
    id: string;
    displayName: string;
  } | null;

  notes: string | null;

  resolution: IncidentResolutionDetail | null;

  createdAt: Date;
  updatedAt: Date;
};
