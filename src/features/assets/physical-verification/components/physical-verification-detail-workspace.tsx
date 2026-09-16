'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';

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
  const router = useRouter();

  const [isGeneratingItems, setIsGeneratingItems] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isObservationDialogOpen, setIsObservationDialogOpen] = useState(false);

  const verifiedItemCount = verification.items.filter(
    (item) => item.verifiedAt,
  ).length;

  const totalItemCount = verification.items.length;

  const verificationProgress =
    totalItemCount > 0 ? (verifiedItemCount / totalItemCount) * 100 : 0;

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
        <div className="flex flex-wrap items-center gap-2">
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
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Verification Information
            </h2>

            <p className="text-sm leading-5 text-muted-foreground">
              General information and scope for this physical verification.
            </p>
          </div>

          <div className="rounded-md border border-border bg-surface">
            <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Reference Number
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {verification.referenceNumber}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </p>

                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full bg-info-surface px-2 py-1 text-xs font-medium text-info">
                    {verification.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Scope
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {verification.scope}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Organization Unit
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {verification.organizationUnit
                    ? verification.organizationUnit.name
                    : '—'}
                </p>

                {verification.organizationUnit && (
                  <p className="text-xs text-muted-foreground">
                    {verification.organizationUnit.code}
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Location
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {verification.location ? verification.location.name : '—'}
                </p>

                {verification.location && (
                  <p className="text-xs text-muted-foreground">
                    {verification.location.code}
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Created By
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {verification.createdByUser.displayName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Completed At
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {verification.completedAt
                    ? verification.completedAt.toLocaleString()
                    : '—'}
                </p>
              </div>
            </div>

            <div className="border-t border-border px-6 py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Notes
              </p>

              <p className="mt-1 text-sm leading-6 text-foreground">
                {verification.notes || '—'}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Verification Items
            </h2>

            <p className="text-sm leading-5 text-muted-foreground">
              Assets included in this physical verification.
            </p>
          </div>

          {verification.items.length === 0 ? (
            <EmptyState
              title="No verification items"
              description={
                verification.status === 'DRAFT'
                  ? 'Generate verification items to begin the physical verification process.'
                  : 'No verification items are associated with this verification.'
              }
            />
          ) : (
            <>
              <div className="rounded-md border border-border bg-surface p-4">
                <div className="space-y-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Verification Progress
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {verifiedItemCount} of {totalItemCount} items verified
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-foreground">
                      {Math.round(verificationProgress)}%
                    </p>
                  </div>

                  <div
                    className="h-2 w-full overflow-hidden rounded-full bg-surface-muted"
                    aria-label={`Verification progress: ${Math.round(
                      verificationProgress,
                    )}%`}
                  >
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${verificationProgress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <PhysicalVerificationItemTable
                items={verification.items}
                verificationId={verification.id}
              />
            </>
          )}
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Unregistered Asset Observations
            </h2>

            <p className="text-sm leading-5 text-muted-foreground">
              Assets physically observed during verification that are not part
              of the registered verification items.
            </p>
          </div>

          {verification.unregisteredObservations.length === 0 ? (
            <EmptyState
              title="No unregistered asset observations"
              description="No unregistered assets have been recorded for this verification."
            />
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
