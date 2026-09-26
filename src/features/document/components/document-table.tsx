'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { RowActionButtons } from '@/components/common/row-action-buttons';
import type { DocumentWithVersions } from '../document-type/types/document.types';

type DocumentTableProps = {
  documents: DocumentWithVersions[];
  onEdit: (document: DocumentWithVersions) => void;
  onDelete: (document: DocumentWithVersions) => void;
  onUploadVersion: (document: DocumentWithVersions) => void;
  deletingId: string | null;
};

function formatFileSize(fileSize: bigint) {
  const size = Number(fileSize);

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
}

export function DocumentTable({
  documents,
  onEdit,
  onDelete,
  onUploadVersion,
  deletingId,
}: DocumentTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Related Record</TableHead>
            <TableHead>File</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                No documents found.
              </TableCell>
            </TableRow>
          ) : (
            documents.map((document) => {
              const currentVersion = document.versions[0];

              return (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">
                    {document.documentType.name}
                  </TableCell>

                  <TableCell>{document.title}</TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {document.entityType.replaceAll('_', ' ')}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {document.entityId}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {currentVersion ? (
                      <div className="space-y-1">
                        <div className="text-sm">
                          {currentVersion.originalFileName}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {formatFileSize(currentVersion.fileSize)} ·{' '}
                          {currentVersion.mimeType}
                        </div>
                      </div>
                    ) : (
                      '—'
                    )}
                  </TableCell>

                  <TableCell>
                    {currentVersion ? `v${currentVersion.versionNumber}` : '—'}
                  </TableCell>

                  <TableCell>{formatDate(document.createdAt)}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      {currentVersion && (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            window.open(
                              `/api/documents/versions/${currentVersion.id}/download`,
                              '_blank',
                              'noopener,noreferrer',
                            );
                          }}
                        >
                          View
                        </Button>
                      )}

                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => onUploadVersion(document)}
                      >
                        Upload Version
                      </Button>

                      <RowActionButtons onEdit={() => onEdit(document)} />

                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => onDelete(document)}
                        disabled={deletingId === document.id}
                      >
                        {deletingId === document.id ? 'Deleting...' : 'Delete'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
