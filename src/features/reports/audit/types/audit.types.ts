export type AuditReportFilters = {
  search?: string;
  userId?: string;
  action?: string;
  entityType?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type AuditReportRow = {
  id: string;
  user: {
    id: string;
    displayName: string;
    username: string;
    isActive: boolean;
  };
  action: string;
  entityType: string;
  entityId: string;
  description: string;
  createdAt: Date;
};

export type AuditDetail = {
  id: string;
  user: {
    id: string;
    displayName: string;
    username: string;
    isActive: boolean;
    employeeId: string | null;
  };
  action: string;
  entityType: string;
  entityId: string;
  description: string;
  oldValue: unknown | null;
  newValue: unknown | null;
  createdAt: Date;
};
