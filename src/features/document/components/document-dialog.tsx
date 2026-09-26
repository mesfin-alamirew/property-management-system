'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type {
  DocumentEntityType,
  DocumentRecord,
  DocumentTypeRecord,
} from '../document-type/types/document.types';

import { DocumentForm } from './document-form';

type DocumentEntityOption = {
  id: string;
  label: string;
};

type DocumentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  document?: DocumentRecord | null;

  documentTypes: DocumentTypeRecord[];

  entityOptions: Record<DocumentEntityType, DocumentEntityOption[]>;
};

export function DocumentDialog({
  open,
  onOpenChange,
  document,
  documentTypes,
  entityOptions,
}: DocumentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {document ? 'Edit Document' : 'Upload Document'}
          </DialogTitle>

          <DialogDescription className="pt-2">
            {document
              ? 'Update the document information and related PMS record.'
              : 'Upload a supporting document and associate it with a PMS record.'}
          </DialogDescription>
        </DialogHeader>

        <DocumentForm
          document={document}
          documentTypes={documentTypes}
          entityOptions={entityOptions}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
