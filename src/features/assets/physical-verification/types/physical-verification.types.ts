export type PhysicalVerificationItemWithRelations = {
  id: string;

  verificationId: string;
  assetId: string;

  // Expected snapshot
  expectedAssetCode: string;
  expectedAssetTag: string | null;
  expectedSerialNumber: string | null;
  expectedAssetName: string;

  expectedEmployeeId: string | null;
  expectedEmployeeNumber: string | null;
  expectedEmployeeName: string | null;

  expectedLocationId: string | null;
  expectedLocationCode: string | null;
  expectedLocationName: string | null;

  expectedConditionId: string | null;
  expectedConditionCode: string | null;
  expectedConditionName: string | null;

  // Observed snapshot
  observedAssetTag: string | null;
  observedSerialNumber: string | null;

  observedEmployeeNumber: string | null;
  observedEmployeeName: string | null;

  observedLocationCode: string | null;
  observedLocationName: string | null;

  observedConditionCode: string | null;
  observedConditionName: string | null;

  // Result
  result: string;

  notes: string | null;

  verifiedAt: Date | null;

  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };

  verification: {
    id: string;
    referenceNumber: string;
    title: string;
    status: string;
  };

  verifiedByUser: {
    id: string;
    username: string;
    displayName: string;
  } | null;

  createdAt: Date;
  updatedAt: Date;
};
export type PhysicalVerificationDetailWithRelations = {
  id: string;

  referenceNumber: string;
  title: string;

  scope: string;

  organizationUnitId: string | null;
  locationId: string | null;

  status: string;

  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;

  notes: string | null;

  createdByUserId: string;

  createdByUser: {
    id: string;
    username: string;
    displayName: string;
  };

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

  items: PhysicalVerificationItemWithRelations[];

  unregisteredObservations: {
    id: string;

    verificationId: string;

    observedAssetTag: string | null;
    observedSerialNumber: string | null;
    observedName: string;

    observedLocationId: string | null;
    observedConditionId: string | null;

    notes: string | null;

    observedByUserId: string;

    observedAt: Date;

    registeredAssetId: string | null;

    observedByUser: {
      id: string;
      username: string;
      displayName: string;
    };

    registeredAsset: {
      id: string;
      assetCode: string;
      assetTag: string | null;
      name: string;
    } | null;

    observedLocation: {
      id: string;
      code: string;
      name: string;
    } | null;

    observedCondition: {
      id: string;
      code: string;
      name: string;
    } | null;

    createdAt: Date;
    updatedAt: Date;
  }[];

  createdAt: Date;
  updatedAt: Date;
};
export type PhysicalVerificationWithRelations = {
  id: string;

  referenceNumber: string;
  title: string;
  scope: string;

  organizationUnitId: string | null;
  locationId: string | null;

  status: string;

  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;

  notes: string | null;

  createdByUserId: string;

  createdByUser: {
    id: string;
    username: string;
    displayName: string;
  };

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

  _count: {
    items: number;
    unregisteredObservations: number;
  };

  createdAt: Date;
  updatedAt: Date;
};
