export type AssetLocationWithRelations = {
  id: string;

  code: string;

  name: string;

  description: string | null;

  organizationUnitId: string;

  organizationUnit: {
    id: string;
    code: string;
    name: string;
  };

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
};
