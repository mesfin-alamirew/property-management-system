'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import type { RetirementWithRelations } from '../types/retirement.types';

import { RetirementTable } from './retirement-table';
import { RetirementDialog } from './retirement-dialog';
import { RetirementCancelDialog } from './retirement-cancel-dialog';

import {
  requestRetirementAction,
  approveRetirementAction,
  cancelRetirementAction,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Retirement</h1>

          <p className="text-sm text-muted-foreground">
            Create and manage asset retirement requests.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Create Retirement
        </button>
      </div>

      {/* Retirement Table */}
      <RetirementTable
        retirements={retirements}
        onRequest={handleRequest}
        onApprove={handleApprove}
        onCancel={handleCancel}
      />

      {/* Retirement Dialog */}
      <RetirementDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        assets={assets}
        conditions={conditions}
      />
      {/* Retirement Cancel Dialog */}
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
    </div>
  );
}
