'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import { deleteDocumentAction } from '../actions/document.actions';

import type { DocumentEntityType } from '../document-type/types/document.types';
import { DocumentVersionDialog } from './document-version-dialog';
import type {
  DocumentRecord,
  DocumentTypeRecord,
  DocumentWithVersions,
} from '../document-type/types/document.types';

import { DocumentDialog } from './document-dialog';
import { DocumentTable } from './document-table';

type DocumentEntityOption = {
  id: string;
  label: string;
};

type DocumentWorkspaceProps = {
  documents: DocumentWithVersions[];

  documentTypes: DocumentTypeRecord[];

  entityOptions: Record<DocumentEntityType, DocumentEntityOption[]>;
};

export function DocumentWorkspace({
  documents,
  documentTypes,
  entityOptions,
}: DocumentWorkspaceProps) {
  const router = useRouter();

  const [selectedDocument, setSelectedDocument] =
    useState<DocumentRecord | null>(null);
  const [documentToVersion, setDocumentToVersion] =
    useState<DocumentWithVersions | null>(null);

  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] =
    useState<DocumentWithVersions | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedDocument(null);
    setIsDialogOpen(true);
  }

  function handleEdit(document: DocumentWithVersions) {
    setSelectedDocument(document);
    setIsDialogOpen(true);
  }

  function handleDelete(document: DocumentWithVersions) {
    setDocumentToDelete(document);
    setIsConfirmationOpen(true);
  }
  function handleUploadVersion(document: DocumentWithVersions) {
    setDocumentToVersion(document);
    setIsVersionDialogOpen(true);
  }
  async function confirmDelete() {
    if (!documentToDelete) {
      return;
    }

    try {
      setDeletingId(documentToDelete.id);

      const result = await deleteDocumentAction(documentToDelete.id);

      if (result.success) {
        toast.success('Document deleted successfully');

        setIsConfirmationOpen(false);
        setDocumentToDelete(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <MasterDataLayout
      title="Documents"
      description="Upload and manage supporting documents for PMS records."
      actions={
        <Button type="button" onClick={handleCreate}>
          Add Document
        </Button>
      }
    >
      <DocumentTable
        documents={documents}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUploadVersion={handleUploadVersion}
        deletingId={deletingId}
      />

      <DocumentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        document={selectedDocument}
        documentTypes={documentTypes}
        entityOptions={entityOptions}
      />
      <DocumentVersionDialog
        open={isVersionDialogOpen}
        onOpenChange={(open) => {
          setIsVersionDialogOpen(open);

          if (!open) {
            setDocumentToVersion(null);
          }
        }}
        document={documentToVersion}
      />
      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Delete Document"
        description={
          documentToDelete
            ? `Are you sure you want to delete "${documentToDelete.title}"? The document metadata and version history will be retained.`
            : ''
        }
        confirmLabel="Delete"
        loading={deletingId !== null}
        onConfirm={confirmDelete}
      />
    </MasterDataLayout>
  );
}
