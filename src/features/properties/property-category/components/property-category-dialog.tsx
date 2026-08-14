'use client';

import type { PropertyCategory } from '@/generated/prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { PropertyCategoryForm } from './property-category-form';

type PropertyCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyCategory: PropertyCategory | null;
  parentCategories: PropertyCategory[];
};

export function PropertyCategoryDialog({
  open,
  onOpenChange,
  propertyCategory,
  parentCategories,
}: PropertyCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {propertyCategory
              ? 'Edit Property Category'
              : 'Create Property Category'}
          </DialogTitle>

          <DialogDescription>
            Enter property category information.
          </DialogDescription>
        </DialogHeader>

        <PropertyCategoryForm
          propertyCategory={propertyCategory}
          parentCategories={parentCategories}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
