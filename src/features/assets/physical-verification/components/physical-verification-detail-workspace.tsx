'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import type { PhysicalVerificationDetailWithRelations } from '../types/physical-verification.types';

import { generatePhysicalVerificationItemsAction } from '../actions/physical-verification.actions';

type PhysicalVerificationDetailWorkspaceProps = {
  verification: PhysicalVerificationDetailWithRelations;
};

export function PhysicalVerificationDetailWorkspace({
  verification,
}: PhysicalVerificationDetailWorkspaceProps) {
  const router = useRouter();

  const [isGeneratingItems, setIsGeneratingItems] = useState(false);

  async function handleGenerateItems() {
    setIsGeneratingItems(true);

    try {
      const result = await generatePhysicalVerificationItemsAction(
        verification.id,
      );

      if (result.success) {
        toast.success(
          `${result.data.itemCount} verification item(s) generated successfully`,
        );

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setIsGeneratingItems(false);
    }
  }

  return (
    <MasterDataLayout
      title={verification.title}
      description={`Physical Verification ${verification.referenceNumber}`}
      actions={
        <div className="flex gap-2">
          {verification.status === 'DRAFT' && (
            <Button
              type="button"
              onClick={handleGenerateItems}
              disabled={isGeneratingItems}
            >
              {isGeneratingItems ? 'Generating...' : 'Generate Items'}
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Reference Number</p>

            <p className="font-medium">{verification.referenceNumber}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>

            <p className="font-medium">{verification.status}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Scope</p>

            <p className="font-medium">{verification.scope}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Organization Unit</p>

            <p className="font-medium">
              {verification.organizationUnit
                ? `${verification.organizationUnit.code} - ${verification.organizationUnit.name}`
                : '-'}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Location</p>

            <p className="font-medium">
              {verification.location
                ? `${verification.location.code} - ${verification.location.name}`
                : '-'}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Created By</p>

            <p className="font-medium">
              {verification.createdByUser.displayName}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Notes</p>

          <p className="font-medium">{verification.notes || '-'}</p>
        </div>
      </div>
    </MasterDataLayout>
  );
}
