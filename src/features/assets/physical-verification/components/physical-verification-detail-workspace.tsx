'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PhysicalVerificationDetailWithRelations } from '../types/physical-verification.types';

import {
  generatePhysicalVerificationItemsAction,
  completePhysicalVerificationAction,
} from '../actions/physical-verification.actions';

import { PhysicalVerificationItemForm } from './physical-verification-item-form';
import { UnregisteredAssetObservationForm } from './unregistered-asset-observation-form';

type PhysicalVerificationDetailWorkspaceProps = {
  verification: PhysicalVerificationDetailWithRelations;
};

export function PhysicalVerificationDetailWorkspace({
  verification,
}: PhysicalVerificationDetailWorkspaceProps) {
  const router = useRouter();

  const [isGeneratingItems, setIsGeneratingItems] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isAddingUnregisteredAsset, setIsAddingUnregisteredAsset] =
    useState(false);

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

  async function handleCompleteVerification() {
    setIsCompleting(true);

    try {
      const result = await completePhysicalVerificationAction(verification.id);

      if (result.success) {
        toast.success('Physical Verification completed successfully');

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setIsCompleting(false);
    }
  }

  const selectedItem = verification.items.find(
    (item) => item.id === selectedItemId,
  );

  const hasUnverifiedItems = verification.items.some(
    (item) => !item.verifiedAt,
  );

  const verificationSummary = {
    total: verification.items.length,

    verified: verification.items.filter((item) => item.result === 'VERIFIED')
      .length,

    notFound: verification.items.filter((item) => item.result === 'NOT_FOUND')
      .length,

    identificationMismatch: verification.items.filter(
      (item) => item.result === 'IDENTIFICATION_MISMATCH',
    ).length,

    locationMismatch: verification.items.filter(
      (item) => item.result === 'LOCATION_MISMATCH',
    ).length,

    custodianMismatch: verification.items.filter(
      (item) => item.result === 'CUSTODIAN_MISMATCH',
    ).length,

    conditionMismatch: verification.items.filter(
      (item) => item.result === 'CONDITION_MISMATCH',
    ).length,

    multipleDiscrepancies: verification.items.filter(
      (item) => item.result === 'MULTIPLE_DISCREPANCIES',
    ).length,

    unregisteredAssets: verification.unregisteredObservations.length,
  };

  const canModify =
    verification.status !== 'COMPLETED' && verification.status !== 'CANCELLED';

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
              onClick={handleCompleteVerification}
              disabled={
                isCompleting ||
                verification.items.length === 0 ||
                hasUnverifiedItems
              }
            >
              {isCompleting ? 'Completing...' : 'Complete Verification'}
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-8">
        {/* Verification Summary */}
        <section className="space-y-6">
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
        </section>

        {/* Verification Results Summary */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Verification Results</h2>

            <p className="text-sm text-muted-foreground">
              Summary of the physical verification results.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">Total Items</p>

              <p className="mt-1 text-2xl font-semibold">
                {verificationSummary.total}
              </p>
            </div>

            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">Verified</p>

              <p className="mt-1 text-2xl font-semibold">
                {verificationSummary.verified}
              </p>
            </div>

            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">Not Found</p>

              <p className="mt-1 text-2xl font-semibold">
                {verificationSummary.notFound}
              </p>
            </div>

            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                Identification Mismatch
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {verificationSummary.identificationMismatch}
              </p>
            </div>

            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">Location Mismatch</p>

              <p className="mt-1 text-2xl font-semibold">
                {verificationSummary.locationMismatch}
              </p>
            </div>

            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                Custodian Mismatch
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {verificationSummary.custodianMismatch}
              </p>
            </div>

            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                Condition Mismatch
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {verificationSummary.conditionMismatch}
              </p>
            </div>

            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                Multiple Discrepancies
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {verificationSummary.multipleDiscrepancies}
              </p>
            </div>

            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                Unregistered Assets
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {verificationSummary.unregisteredAssets}
              </p>
            </div>
          </div>
        </section>

        {/* Verification Items */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Verification Items</h2>

            <p className="text-sm text-muted-foreground">
              Assets included in this physical verification.
            </p>
          </div>

          {verification.items.length === 0 ? (
            <div className="rounded-md border p-6 text-sm text-muted-foreground">
              No verification items have been generated yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Code</TableHead>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Asset Tag</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {verification.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.expectedAssetCode}
                      </TableCell>

                      <TableCell>{item.expectedAssetName}</TableCell>

                      <TableCell>{item.expectedAssetTag || '-'}</TableCell>

                      <TableCell>{item.expectedEmployeeName || '-'}</TableCell>

                      <TableCell>{item.expectedLocationName || '-'}</TableCell>

                      <TableCell>{item.result}</TableCell>

                      <TableCell>
                        {canModify ? (
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setSelectedItemId(item.id)}
                          >
                            {item.verifiedAt ? 'Edit' : 'Verify'}
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        {/* Selected Verification Item */}
        {selectedItem && (
          <section className="space-y-4 rounded-md border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Verify Asset</h2>

                <p className="text-sm text-muted-foreground">
                  {selectedItem.expectedAssetCode} -{' '}
                  {selectedItem.expectedAssetName}
                </p>
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={() => setSelectedItemId(null)}
              >
                Close
              </Button>
            </div>

            <PhysicalVerificationItemForm
              item={selectedItem}
              onSuccess={() => {
                setSelectedItemId(null);
                router.refresh();
              }}
            />
          </section>
        )}

        {/* Unregistered Asset Observations */}
        <section className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">
                Unregistered Asset Observations
              </h2>

              <p className="text-sm text-muted-foreground">
                Assets physically found during verification that are not
                included in the registered asset list.
              </p>
            </div>

            {canModify && (
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setIsAddingUnregisteredAsset((current) => !current)
                }
              >
                {isAddingUnregisteredAsset
                  ? 'Close Form'
                  : 'Record Unregistered Asset'}
              </Button>
            )}
          </div>

          {isAddingUnregisteredAsset && (
            <div className="rounded-md border p-6">
              <UnregisteredAssetObservationForm
                verificationId={verification.id}
                onSuccess={() => {
                  setIsAddingUnregisteredAsset(false);
                  router.refresh();
                }}
              />
            </div>
          )}

          {verification.unregisteredObservations.length === 0 ? (
            <div className="rounded-md border p-6 text-sm text-muted-foreground">
              No unregistered asset observations have been recorded.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Asset Tag</TableHead>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Observed At</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {verification.unregisteredObservations.map((observation) => (
                    <TableRow key={observation.id}>
                      <TableCell>{observation.observedName}</TableCell>

                      <TableCell>
                        {observation.observedAssetTag || '-'}
                      </TableCell>

                      <TableCell>
                        {observation.observedSerialNumber || '-'}
                      </TableCell>

                      <TableCell>
                        {observation.observedLocation?.name || '-'}
                      </TableCell>

                      <TableCell>
                        {observation.observedCondition?.name || '-'}
                      </TableCell>

                      <TableCell>
                        {observation.observedAt.toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </div>
    </MasterDataLayout>
  );
}
