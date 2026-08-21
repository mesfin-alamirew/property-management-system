export type AssetMovementWithRelations = {
  id: string;

  assetId: string;

  fromLocationId: string | null;
  toLocationId: string;

  movedAt: Date;

  movedByUserId: string;

  reason: string | null;
  notes: string | null;

  createdAt: Date;
  updatedAt: Date;

  asset: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  };

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
    username: string;
    displayName: string;
  };
};
