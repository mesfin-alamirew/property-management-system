export type PhysicalVerificationReportFilters = {
  search?: string;
  organizationUnitId?: string;
  locationId?: string;
  scope?: PhysicalVerificationScope | 'ALL';
  status?: PhysicalVerificationStatus | 'ALL';
  scheduledDateFrom?: string;
  scheduledDateTo?: string;
  completedDateFrom?: string;
  completedDateTo?: string;
};

export type PhysicalVerificationScope =
  | 'ORGANIZATION'
  | 'ORGANIZATION_UNIT'
  | 'LOCATION'
  | 'ORGANIZATION_UNIT_LOCATION'
  | 'SELECTED_ASSETS';

export type PhysicalVerificationStatus =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type PhysicalVerificationResult =
  | 'PENDING'
  | 'VERIFIED'
  | 'NOT_FOUND'
  | 'LOCATION_MISMATCH'
  | 'CUSTODIAN_MISMATCH'
  | 'CONDITION_MISMATCH'
  | 'IDENTIFICATION_MISMATCH'
  | 'MULTIPLE_DISCREPANCIES';

export type PhysicalVerificationReportRow = {
  id: string;
  referenceNumber: string;
  title: string;

  scope: PhysicalVerificationScope;

  organizationUnit: {
    id: string;
    code: string;
    name: string;
  } | null;

  location: {
    id: string;
    code: string;
    name: string;
  } | null;

  status: PhysicalVerificationStatus;

  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;

  createdByUser: {
    id: string;
    displayName: string;
  };

  itemCount: number;
  verifiedCount: number;
  pendingCount: number;
  discrepancyCount: number;
  unregisteredObservationCount: number;
};
export type PhysicalVerificationDetail = {
  id: string;
  referenceNumber: string;
  title: string;
  scope: PhysicalVerificationScope;
  organizationUnit: {
    id: string;
    code: string;
    name: string;
  } | null;
  location: {
    id: string;
    code: string;
    name: string;
  } | null;
  status: PhysicalVerificationStatus;
  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  notes: string | null;
  createdByUser: {
    id: string;
    displayName: string;
  };
  itemCount: number;
  verifiedCount: number;
  pendingCount: number;
  discrepancyCount: number;
  unregisteredObservationCount: number;
};

export type PhysicalVerificationDetailItem = {
  id: string;
  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
    serialNumber: string | null;
  };
  expectedAssetCode: string;
  expectedAssetTag: string | null;
  expectedSerialNumber: string | null;
  expectedAssetName: string;
  expectedEmployee: {
    id: string;
    employeeNumber: string;
    name: string;
  } | null;
  expectedEmployeeNumber: string | null;
  expectedEmployeeName: string | null;
  expectedLocation: {
    id: string;
    code: string;
    name: string;
  } | null;
  expectedLocationCode: string | null;
  expectedLocationName: string | null;
  expectedConditionCode: string | null;
  expectedConditionName: string | null;
  observedAssetTag: string | null;
  observedSerialNumber: string | null;
  observedEmployeeNumber: string | null;
  observedEmployeeName: string | null;
  observedLocationCode: string | null;
  observedLocationName: string | null;
  observedConditionCode: string | null;
  observedConditionName: string | null;
  result: PhysicalVerificationResult;
  notes: string | null;
  verifiedByUser: {
    id: string;
    displayName: string;
  } | null;
  verifiedAt: Date | null;
};

export type PhysicalVerificationUnregisteredObservation = {
  id: string;
  observedAssetTag: string | null;
  observedSerialNumber: string | null;
  observedName: string;
  observedLocation: {
    id: string;
    code: string;
    name: string;
  } | null;
  observedLocationCode: string | null;
  observedLocationName: string | null;
  observedConditionCode: string | null;
  observedConditionName: string | null;
  notes: string | null;
  observedByUser: {
    id: string;
    displayName: string;
  };
  observedAt: Date;
  registeredAsset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  } | null;
};

export type PhysicalVerificationDetailResultSummary = {
  result: PhysicalVerificationResult;
  count: number;
};
