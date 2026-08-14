export type AssetStatusWithRelations = {
  id: string;

  code: string;
  name: string;
  description: string | null;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
};
