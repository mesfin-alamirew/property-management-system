'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { StatusBadge } from '@/components/common/status-badge';
import { RowActionButtons } from '@/components/common/row-action-buttons';

import type { DocumentTypeRecord } from '../types/document.types';

type DocumentTypeTableProps = {
  documentTypes: DocumentTypeRecord[];
  onEdit: (documentType: DocumentTypeRecord) => void;
  onDeactivate: (documentType: DocumentTypeRecord) => void;
  deactivatingId: string | null;
};

export function DocumentTypeTable({
  documentTypes,
  onEdit,
  onDeactivate,
  deactivatingId,
}: DocumentTypeTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>

            <TableHead>Name</TableHead>

            <TableHead>Description</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {documentTypes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                No document types found.
              </TableCell>
            </TableRow>
          ) : (
            documentTypes.map((documentType) => (
              <TableRow key={documentType.id}>
                <TableCell className="font-medium">
                  {documentType.code}
                </TableCell>

                <TableCell>{documentType.name}</TableCell>

                <TableCell>{documentType.description || '—'}</TableCell>

                <TableCell>
                  <StatusBadge active={documentType.isActive} />
                </TableCell>

                <TableCell>
                  <div className="flex justify-end">
                    <RowActionButtons
                      onEdit={() => onEdit(documentType)}
                      onDeactivate={() => onDeactivate(documentType)}
                      loading={deactivatingId === documentType.id}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
