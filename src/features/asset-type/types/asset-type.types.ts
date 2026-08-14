export type AssetTypeWithRelations = {
  id: string;

  code: string;
  name: string;
  description: string | null;

  categoryId: string;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  category: {
    id: string;
    code: string;
    name: string;
  };
};
