export type AssignmentStatus = 'CURRENT' | 'RETURNED';

export type AssignmentReportFilters = {
  search?: string;
  employeeId?: string;
  organizationUnitId?: string;
  assetTypeId?: string;
  status?: AssignmentStatus | 'ALL';
  assignedDateFrom?: string;
  assignedDateTo?: string;
};

export type AssignmentReportRow = {
  id: string;

  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
    assetType: {
      id: string;
      code: string;
      name: string;
    };
  };

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

  assetLocation: {
    id: string;
    code: string;
    name: string;
    organizationUnit: {
      id: string;
      code: string;
      name: string;
    };
  } | null;

  assignedAt: Date;
  returnedAt: Date | null;
  status: AssignmentStatus;
};
export type AssignmentDetail = {
  id: string;

  asset: {
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
  };

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

  assignedAt: Date;
  returnedAt: Date | null;

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

export type AssignmentHistoryRow = {
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
