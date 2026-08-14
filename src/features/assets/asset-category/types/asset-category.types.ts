export type AssetCategoryWithRelations = {
  id: string;

  code: string;
  name: string;
  description: string | null;

  parentId: string | null;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  parent: {
    id: string;
    code: string;
    name: string;
  } | null;
};
