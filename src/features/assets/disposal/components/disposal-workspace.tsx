'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import type { DisposalWithRelations } from '../types/disposal.types';

import { DisposalTable } from './disposal-table';
import { DisposalDialog } from './disposal-dialog';
import { DisposalCancelDialog } from './disposal-cancel-dialog';
import { DisposalItemDialog } from './disposal-item-dialog';

import {
  requestDisposalAction,
  approveDisposalAction,
} from '../actions/disposal.actions';

type DisposalWorkspaceProps = {
  disposals: DisposalWithRelations[];

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];
};

export function DisposalWorkspace({
  disposals,
  assets,
}: DisposalWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);

  const [selectedDisposalForItems, setSelectedDisposalForItems] =
    useState<DisposalWithRelations | null>(null);

  const [selectedDisposal, setSelectedDisposal] =
    useState<DisposalWithRelations | null>(null);

  function handleCreate() {
    setIsDialogOpen(true);
  }

  async function handleRequest(disposal: DisposalWithRelations) {
    const result = await requestDisposalAction(disposal.id);

    if (result.success) {
      toast.success('Disposal requested successfully');
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleApprove(disposal: DisposalWithRelations) {
    const result = await approveDisposalAction(disposal.id);

    if (result.success) {
      toast.success('Disposal approved successfully');
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  function handleCancel(disposal: DisposalWithRelations) {
    setSelectedDisposal(disposal);
    setIsCancelDialogOpen(true);
  }

  function handleAddItem(disposal: DisposalWithRelations) {
    setSelectedDisposalForItems(disposal);
    setIsItemDialogOpen(true);
  }

  return (
    <MasterDataLayout
      title="Disposal"
      description="Create and manage asset disposal requests."
      actions={
        <Button type="button" onClick={handleCreate}>
          Create Disposal
        </Button>
      }
    >
      <DisposalTable
        disposals={disposals}
        onRequest={handleRequest}
        onApprove={handleApprove}
        onCancel={handleCancel}
        onAddItem={handleAddItem}
      />

      <DisposalDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <DisposalCancelDialog
        open={isCancelDialogOpen}
        onOpenChange={(open) => {
          setIsCancelDialogOpen(open);

          if (!open) {
            setSelectedDisposal(null);
          }
        }}
        disposal={selectedDisposal}
        onSuccess={() => {
          setSelectedDisposal(null);
        }}
      />

      {selectedDisposalForItems && (
        <DisposalItemDialog
          open={isItemDialogOpen}
          onOpenChange={(open) => {
            setIsItemDialogOpen(open);

            if (!open) {
              setSelectedDisposalForItems(null);
            }
          }}
          disposalItem={null}
          disposalId={selectedDisposalForItems.id}
          assets={assets}
        />
      )}
    </MasterDataLayout>
  );
}
