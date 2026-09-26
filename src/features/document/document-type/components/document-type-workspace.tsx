'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import { deactivateDocumentTypeAction } from '../actions/document-type.actions';
import type { DocumentTypeRecord } from '../types/document.types';

import { DocumentTypeDialog } from './document-type-dialog';
import { DocumentTypeTable } from './document-type-table';

type DocumentTypeWorkspaceProps = {
  documentTypes: DocumentTypeRecord[];
};

export function DocumentTypeWorkspace({
  documentTypes,
}: DocumentTypeWorkspaceProps) {
  const router = useRouter();

  const [selectedDocumentType, setSelectedDocumentType] =
    useState<DocumentTypeRecord | null>(null);

  const [documentTypeToDeactivate, setDocumentTypeToDeactivate] =
    useState<DocumentTypeRecord | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedDocumentType(null);
    setIsDialogOpen(true);
  }

  function handleEdit(documentType: DocumentTypeRecord) {
    setSelectedDocumentType(documentType);
    setIsDialogOpen(true);
  }

  function handleDeactivate(documentType: DocumentTypeRecord) {
    setDocumentTypeToDeactivate(documentType);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!documentTypeToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(documentTypeToDeactivate.id);

      const result = await deactivateDocumentTypeAction(
        documentTypeToDeactivate.id,
      );

      if (result.success) {
        toast.success('Document type deactivated successfully');

        setIsConfirmationOpen(false);
        setDocumentTypeToDeactivate(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setDeactivatingId(null);
    }
  }

  return (
    <MasterDataLayout
      title="Document Types"
      description="Define and manage the types used to classify PMS documents."
      actions={
        <Button type="button" onClick={handleCreate}>
          Add Document Type
        </Button>
      }
    >
      <DocumentTypeTable
        documentTypes={documentTypes}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <DocumentTypeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        documentType={selectedDocumentType}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Document Type"
        description={
          documentTypeToDeactivate
            ? `Are you sure you want to deactivate "${documentTypeToDeactivate.name}"? It will no longer be available for new document uploads.`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
