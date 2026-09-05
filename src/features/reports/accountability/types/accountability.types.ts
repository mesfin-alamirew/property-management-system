export type AccountabilityExceptionType =
  | 'NO_CURRENT_ASSIGNMENT'
  | 'MULTIPLE_CURRENT_ASSIGNMENTS'
  | 'MISSING_LOCATION'
  | 'VERIFICATION_NOT_FOUND'
  | 'VERIFICATION_LOCATION_MISMATCH'
  | 'VERIFICATION_CUSTODIAN_MISMATCH'
  | 'VERIFICATION_CONDITION_MISMATCH'
  | 'VERIFICATION_IDENTIFICATION_MISMATCH'
  | 'VERIFICATION_MULTIPLE_DISCREPANCIES'
  | 'MAINTENANCE_REQUIRING_ACTION'
  | 'ACTIVE_INCIDENT'
  | 'RETIREMENT_PENDING'
  | 'RETIREMENT_APPROVED'
  | 'DISPOSAL_PENDING'
  | 'DISPOSAL_APPROVED';

export type AccountabilityExceptionSeverity = 'HIGH' | 'REVIEW' | 'MONITOR';

export type AccountabilityEvidenceType =
  | 'VERIFICATION'
  | 'MAINTENANCE'
  | 'INCIDENT'
  | 'RETIREMENT'
  | 'DISPOSAL';

export type AccountabilityReportFilters = {
  search?: string;
  exceptionType?: AccountabilityExceptionType;
  severity?: AccountabilityExceptionSeverity;
  organizationUnitId?: string;
  locationId?: string;
  assetTypeId?: string;
  assetStatusId?: string;
};

export type AccountabilityReportRow = {
  id: string;

  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };

  exceptionType: AccountabilityExceptionType;
  severity: AccountabilityExceptionSeverity;
  details: string;

  evidence: {
    type: AccountabilityEvidenceType;
    id: string;
    referenceNumber: string | null;
    date: Date | null;
  } | null;

  location: {
    id: string;
    code: string;
    name: string;
  } | null;

  organizationUnit: {
    id: string;
    code: string;
    name: string;
  } | null;

  employee: {
    id: string;
    employeeNumber: string;
    name: string;
  } | null;
};
