export type AssetAssignmentStatus = 'CURRENT' | 'RETURNED' | 'UNASSIGNED';

export type AssetReportFilters = {
  search?: string;
  assetTypeId?: string;
  assetCategoryId?: string;
  statusId?: string;
  conditionId?: string;
  organizationUnitId?: string;
  locationId?: string;
  assignmentStatus?: AssetAssignmentStatus | 'ALL';
  acquisitionMethodId?: string;
  acquisitionDateFrom?: string;
  acquisitionDateTo?: string;
};

export type AssetReportRow = {
  id: string;

  assetCode: string;
  assetTag: string | null;
  name: string;

  assetType: {
    id: string;
    code: string;
    name: string;
    category: {
      id: string;
      code: string;
      name: string;
    };
  };

  status: {
    id: string;
    code: string;
    name: string;
  };

  condition: {
    id: string;
    code: string;
    name: string;
  };

  location: {
    id: string;
    code: string;
    name: string;
    organizationUnit: {
      id: string;
      code: string;
      name: string;
    };
  } | null;

  currentAssignment: {
    id: string;
    assignedAt: Date;
    employee: {
      id: string;
      employeeNumber: string;
      firstName: string;
      middleName: string | null;
      lastName: string;
    };
  } | null;

  assignmentStatus: AssetAssignmentStatus;

  acquisition: {
    id: string;
    acquisitionNumber: string;
    referenceNumber: string | null;
    acquisitionDate: Date;
    acquisitionMethod: {
      id: string;
      code: string;
      name: string;
    };
    currency: string | null;
    totalCost: string | null;
  } | null;
};

export type AssetDetail = {
  id: string;

  assetCode: string;
  assetTag: string | null;
  name: string;
  description: string | null;
  manufacturer: string | null;
  model: string | null;
  serialNumber: string | null;

  assetType: {
    id: string;
    code: string;
    name: string;
    category: {
      id: string;
      code: string;
      name: string;
    };
  };

  status: {
    id: string;
    code: string;
    name: string;
  };

  condition: {
    id: string;
    code: string;
    name: string;
  };

  location: {
    id: string;
    code: string;
    name: string;
    organizationUnit: {
      id: string;
      code: string;
      name: string;
    };
  } | null;

  currentAssignment: {
    id: string;
    assignedAt: Date;
    employee: {
      id: string;
      employeeNumber: string;
      firstName: string;
      middleName: string | null;
      lastName: string;
      organizationUnit: {
        id: string;
        code: string;
        name: string;
      };
    };
    assignedByUser: {
      id: string;
      displayName: string;
    };
    notes: string | null;
  } | null;

  acquisition: {
    id: string;
    acquisitionNumber: string;
    referenceNumber: string | null;
    acquisitionDate: Date;
    acquisitionMethod: {
      id: string;
      code: string;
      name: string;
    };
    currency: string | null;
    unitCost: string | null;
    totalCost: string | null;
  } | null;

  assignmentHistory: AssetAssignmentHistoryRow[];

  movementHistory: AssetMovementHistoryRow[];

  maintenanceHistory: AssetMaintenanceHistoryRow[];

  incidentHistory: AssetIncidentHistoryRow[];

  verificationHistory: AssetVerificationHistoryRow[];

  retirement: AssetRetirementDetail | null;

  disposal: AssetDisposalDetail | null;

  createdAt: Date;

  updatedAt: Date;
};

export type AssetAssignmentHistoryRow = {
  id: string;

  assignedAt: Date;
  returnedAt: Date | null;

  employee: {
    id: string;
    employeeNumber: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
  };

  assignedByUser: {
    id: string;
    displayName: string;
  };

  returnedByUser: {
    id: string;
    displayName: string;
  } | null;

  notes: string | null;
};
export type AssetMovementHistoryRow = {
  id: string;
  movedAt: Date;
  fromLocation: {
    id: string;
    code: string;
    name: string;
  } | null;
  toLocation: {
    id: string;
    code: string;
    name: string;
  };
  movedByUser: {
    id: string;
    displayName: string;
  };
  reason: string | null;
  notes: string | null;
};

export type AssetMaintenanceHistoryRow = {
  id: string;
  referenceNumber: string;
  type: string;
  status: string;
  title: string;
  requestedAt: Date | null;
  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
};

export type AssetIncidentHistoryRow = {
  id: string;
  referenceNumber: string;
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
  resolution: {
    id: string;
    rootCause: string;
    resolution: string;
    correctiveAction: string | null;
    resolvedByUser: {
      id: string;
      displayName: string;
    };
    notes: string | null;
  } | null;
};

export type AssetVerificationHistoryRow = {
  id: string;
  verification: {
    id: string;
    referenceNumber: string;
    title: string;
    status: string;
    completedAt: Date | null;
  };
  expectedAssetCode: string;
  expectedAssetTag: string | null;
  expectedSerialNumber: string | null;
  expectedAssetName: string;
  expectedEmployeeName: string | null;
  expectedLocationName: string | null;
  expectedConditionName: string | null;
  observedAssetTag: string | null;
  observedSerialNumber: string | null;
  observedEmployeeName: string | null;
  observedLocationName: string | null;
  observedConditionName: string | null;
  result: string;
  notes: string | null;
  verifiedByUser: {
    id: string;
    displayName: string;
  } | null;
  verifiedAt: Date | null;
};

export type AssetRetirementDetail = {
  id: string;
  referenceNumber: string;
  retirementDate: Date;
  reason: string;
  condition: {
    id: string;
    code: string;
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
};

export type AssetDisposalDetail = {
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
};
