'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { DocumentTypeRecord } from '../types/document.types';

import { DocumentTypeForm } from './document-type-form';

type DocumentTypeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentType?: DocumentTypeRecord | null;
};

export function DocumentTypeDialog({
  open,
  onOpenChange,
  documentType,
}: DocumentTypeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {documentType ? 'Edit Document Type' : 'Create Document Type'}
          </DialogTitle>

          <DialogDescription className="pt-2">
            {documentType
              ? 'Update the document type details.'
              : 'Define a document type that can be used to classify PMS documents.'}
          </DialogDescription>
        </DialogHeader>

        <DocumentTypeForm
          documentType={documentType}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
