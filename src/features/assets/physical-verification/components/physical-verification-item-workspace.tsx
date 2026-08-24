'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import type {
  PhysicalVerificationDetailWithRelations,
  PhysicalVerificationItemWithRelations,
} from '../types/physical-verification.types';

import { PhysicalVerificationItemForm } from './physical-verification-item-form';

type PhysicalVerificationItemWorkspaceProps = {
  verification: PhysicalVerificationDetailWithRelations;
  item: PhysicalVerificationItemWithRelations;
};

export function PhysicalVerificationItemWorkspace({
  verification,
  item,
}: PhysicalVerificationItemWorkspaceProps) {
  const router = useRouter();

  function handleSuccess() {
    toast.success('Verification item updated successfully');

    router.push(`/physical-verifications/${verification.id}`);
    router.refresh();
  }

  return (
    <MasterDataLayout
      title={`Verify: ${item.expectedAssetName}`}
      description={`Physical Verification ${verification.referenceNumber}`}
      actions={
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            router.push(`/physical-verifications/${verification.id}`)
          }
        >
          Back to Verification
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="rounded-md border p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Verification</p>
              <p className="font-medium">{verification.referenceNumber}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Asset Code</p>
              <p className="font-medium">{item.expectedAssetCode}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Asset Name</p>
              <p className="font-medium">{item.expectedAssetName}</p>
            </div>
          </div>
        </div>

        <PhysicalVerificationItemForm item={item} />
      </div>
    </MasterDataLayout>
  );
}
