'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { PropertyCategory } from '@/generated/prisma/client';

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
  const isEditing = Boolean(propertyCategory);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Property Category' : 'Create Property Category'}
          </DialogTitle>

          <DialogDescription className="pt-2">
            {isEditing
              ? 'Update the property category information and its parent category.'
              : 'Create a property category and optionally assign it to a parent category.'}
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
