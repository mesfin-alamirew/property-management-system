'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { AssetCategoryWithRelations } from '../types/asset-category.types';

import { AssetCategoryForm } from './asset-category-form';

type AssetCategoryDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  assetCategory?: AssetCategoryWithRelations | null;

  parentCategories: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetCategoryDialog({
  open,
  onOpenChange,
  assetCategory,
  parentCategories,
}: AssetCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {assetCategory ? 'Edit Asset Category' : 'Create Asset Category'}
          </DialogTitle>

          <DialogDescription>
            Enter asset category information.
          </DialogDescription>
        </DialogHeader>

        <AssetCategoryForm
          assetCategory={assetCategory}
          parentCategories={parentCategories}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
