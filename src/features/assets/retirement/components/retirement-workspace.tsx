'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import type { RetirementWithRelations } from '../types/retirement.types';

import { RetirementTable } from './retirement-table';
import { RetirementDialog } from './retirement-dialog';
import { RetirementCancelDialog } from './retirement-cancel-dialog';

import {
  requestRetirementAction,
  approveRetirementAction,
} from '../actions/retirement.actions';

type RetirementWorkspaceProps = {
  retirements: RetirementWithRelations[];

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];

  conditions: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function RetirementWorkspace({
  retirements,
  assets,
  conditions,
}: RetirementWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const [selectedRetirement, setSelectedRetirement] =
    useState<RetirementWithRelations | null>(null);

  function handleCreate() {
    setIsDialogOpen(true);
  }

  async function handleRequest(retirement: RetirementWithRelations) {
    const result = await requestRetirementAction(retirement.id);

    if (result.success) {
      toast.success('Retirement requested successfully');
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleApprove(retirement: RetirementWithRelations) {
    const result = await approveRetirementAction(retirement.id);

    if (result.success) {
      toast.success('Retirement approved successfully');
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  function handleCancel(retirement: RetirementWithRelations) {
    setSelectedRetirement(retirement);
    setIsCancelDialogOpen(true);
  }

  return (
    <MasterDataLayout
      title="Retirement"
      description="Create and manage asset retirement requests."
      actions={
        <Button type="button" onClick={handleCreate}>
          Create Retirement
        </Button>
      }
    >
      <RetirementTable
        retirements={retirements}
        onRequest={handleRequest}
        onApprove={handleApprove}
        onCancel={handleCancel}
      />

      <RetirementDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        assets={assets}
        conditions={conditions}
      />

      <RetirementCancelDialog
        open={isCancelDialogOpen}
        onOpenChange={(open) => {
          setIsCancelDialogOpen(open);

          if (!open) {
            setSelectedRetirement(null);
          }
        }}
        retirement={selectedRetirement}
        onSuccess={() => {
          setSelectedRetirement(null);
        }}
      />
    </MasterDataLayout>
  );
}
