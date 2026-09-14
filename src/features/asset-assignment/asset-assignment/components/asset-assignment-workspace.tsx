'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import { Button } from '@/components/ui/button';

import { returnAssetAssignmentAction } from '../actions/asset-assignment.actions';

import type { AssetAssignmentWithRelations } from '../types/asset-assignment.types';

import { AssetAssignmentTable } from './asset-assignment-table';
import { AssetAssignmentDialog } from './asset-assignment-dialog';

type AssetAssignmentWorkspaceProps = {
  assignments: AssetAssignmentWithRelations[];

  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];

  employees: {
    id: string;
    employeeNumber: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
  }[];
};

export function AssetAssignmentWorkspace({
  assignments,
  assets,
  employees,
}: AssetAssignmentWorkspaceProps) {
  const router = useRouter();

  const [assignmentToReturn, setAssignmentToReturn] =
    useState<AssetAssignmentWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [returningId, setReturningId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setIsDialogOpen(true);
  }

  function handleReturn(assignment: AssetAssignmentWithRelations) {
    setAssignmentToReturn(assignment);
    setIsConfirmationOpen(true);
  }

  async function confirmReturn() {
    if (!assignmentToReturn) {
      return;
    }

    try {
      setReturningId(assignmentToReturn.id);

      const result = await returnAssetAssignmentAction(
        assignmentToReturn.id,
        {},
      );

      if (result.success) {
        toast.success('Asset returned successfully');

        setIsConfirmationOpen(false);
        setAssignmentToReturn(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setReturningId(null);
    }
  }

  return (
    <MasterDataLayout
      title="Asset Assignments"
      description="Manage asset assignments and accountability."
      actions={
        <Button type="button" onClick={handleCreate}>
          Assign Asset
        </Button>
      }
    >
      <AssetAssignmentTable
        assignments={assignments}
        onReturn={handleReturn}
        returningId={returningId}
      />

      <AssetAssignmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        assets={assets}
        employees={employees}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Return Asset"
        description={
          assignmentToReturn
            ? `Are you sure you want to return "${assignmentToReturn.asset.assetCode} - ${assignmentToReturn.asset.name}" from "${assignmentToReturn.employee.firstName} ${assignmentToReturn.employee.lastName}"?`
            : ''
        }
        confirmLabel="Return Asset"
        loading={returningId !== null}
        onConfirm={confirmReturn}
      />
    </MasterDataLayout>
  );
}
