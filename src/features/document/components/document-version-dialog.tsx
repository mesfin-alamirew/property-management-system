'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { DocumentWithVersions } from '../document-type/types/document.types';

import { DocumentVersionForm } from './document-version-form';

type DocumentVersionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: DocumentWithVersions | null;
};

export function DocumentVersionDialog({
  open,
  onOpenChange,
  document,
}: DocumentVersionDialogProps) {
  if (!document) {
    return null;
  }

  function handleSuccess() {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New Version</DialogTitle>

          <DialogDescription>
            Upload a new file version for &quot;{document.title}&quot;. The
            previous version will be retained.
          </DialogDescription>
        </DialogHeader>

        <DocumentVersionForm
          documentId={document.id}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
