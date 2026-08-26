'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';

import type { PhysicalVerificationDetailWithRelations } from '../types/physical-verification.types';

import {
  generatePhysicalVerificationItemsAction,
  completePhysicalVerificationAction,
} from '../actions/physical-verification.actions';
import { PhysicalVerificationItemTable } from './physical-verification-item-table';
import { UnregisteredAssetObservationTable } from './unregistered-asset-observation-table';
import { UnregisteredAssetObservationDialog } from './unregistered-asset-observation-dialog';

type PhysicalVerificationDetailWorkspaceProps = {
  verification: PhysicalVerificationDetailWithRelations;

  assetLocations: {
    id: string;
    code: string;
    name: string;
  }[];

  assetConditions: {
    id: string;
    code: string;
    name: string;
  }[];
};
export function PhysicalVerificationDetailWorkspace({
  verification,
  assetLocations,
  assetConditions,
}: PhysicalVerificationDetailWorkspaceProps) {
  const [isGeneratingItems, setIsGeneratingItems] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isObservationDialogOpen, setIsObservationDialogOpen] = useState(false);
  const verifiedItemCount = verification.items.filter(
    (item) => item.verifiedAt,
  ).length;

  const totalItemCount = verification.items.length;

  const verificationProgress =
    totalItemCount > 0 ? (verifiedItemCount / totalItemCount) * 100 : 0;

  const router = useRouter();
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
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsGeneratingItems(false);
    }
  }
  async function handleCompleteVerification() {
    setIsCompleting(true);

    try {
      const result = await completePhysicalVerificationAction(verification.id);

      if (result.success) {
        toast.success('Physical verification completed successfully');
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsCompleting(false);
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

          {verification.status === 'IN_PROGRESS' && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsObservationDialogOpen(true)}
            >
              Record Unregistered Asset
            </Button>
          )}

          {verification.status === 'IN_PROGRESS' &&
            totalItemCount > 0 &&
            verifiedItemCount === totalItemCount && (
              <Button
                type="button"
                onClick={handleCompleteVerification}
                disabled={isCompleting}
              >
                {isCompleting ? 'Completing...' : 'Complete Verification'}
              </Button>
            )}
        </div>
      }
    >
      <div className="space-y-8">
        {/* ============================================================
            Verification Information
        ============================================================ */}

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Verification Information</h2>

            <p className="text-sm text-muted-foreground">
              General information about this physical verification.
            </p>
          </div>

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
              <p className="text-sm text-muted-foreground">Completed At</p>

              <p className="font-medium">
                {verification.completedAt
                  ? verification.completedAt.toLocaleString()
                  : '-'}
              </p>
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
        </section>

        {/* ============================================================
            Verification Items
        ============================================================ */}

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Verification Items</h2>

            <p className="text-sm text-muted-foreground">
              Assets included in this physical verification.
            </p>
          </div>

          {verification.items.length === 0 ? (
            <div className="rounded-md border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No verification items have been generated yet.
              </p>

              {verification.status === 'DRAFT' && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Click <strong>Generate Items</strong> to create the
                  verification items.
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Verification Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Verification Progress</span>

                  <span className="text-muted-foreground">
                    {verifiedItemCount} of {totalItemCount} items verified
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${verificationProgress}%`,
                    }}
                  />
                </div>
              </div>

              <PhysicalVerificationItemTable
                items={verification.items}
                verificationId={verification.id}
              />
            </>
          )}
        </section>

        {/* ============================================================
            Unregistered Asset Observations
        ============================================================ */}

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">
              Unregistered Asset Observations
            </h2>

            <p className="text-sm text-muted-foreground">
              Assets physically observed during verification that are not part
              of the registered verification items.
            </p>
          </div>

          {verification.unregisteredObservations.length === 0 ? (
            <div className="rounded-md border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No unregistered asset observations have been recorded.
              </p>
            </div>
          ) : (
            <UnregisteredAssetObservationTable
              observations={verification.unregisteredObservations}
            />
          )}
        </section>
      </div>
      <UnregisteredAssetObservationDialog
        open={isObservationDialogOpen}
        onOpenChange={setIsObservationDialogOpen}
        verificationId={verification.id}
        assetLocations={assetLocations}
        assetConditions={assetConditions}
      />
    </MasterDataLayout>
  );
}
