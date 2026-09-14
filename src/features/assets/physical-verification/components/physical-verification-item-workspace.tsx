'use client';

import { useRouter } from 'next/navigation';

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

  function handleBack() {
    router.push(`/physical-verifications/${verification.id}`);
  }

  return (
    <MasterDataLayout
      title={`Verify: ${item.expectedAssetName}`}
      description={`Physical Verification ${verification.referenceNumber}`}
      actions={
        <Button type="button" variant="secondary" onClick={handleBack}>
          Back to Verification
        </Button>
      }
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Verification Context
            </h2>

            <p className="text-sm leading-5 text-muted-foreground">
              Confirm the verification and asset you are currently reviewing.
            </p>
          </div>

          <div className="rounded-md border border-border bg-surface">
            <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Verification
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {verification.referenceNumber}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Verification Status
                </p>

                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full bg-info-surface px-2 py-1 text-xs font-medium text-info">
                    {verification.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Asset Code
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {item.expectedAssetCode}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Asset Name
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {item.expectedAssetName}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Verification Details
            </h2>

            <p className="text-sm leading-5 text-muted-foreground">
              Compare the expected asset information with what was physically
              observed.
            </p>
          </div>

          <PhysicalVerificationItemForm item={item} />
        </section>
      </div>
    </MasterDataLayout>
  );
}
