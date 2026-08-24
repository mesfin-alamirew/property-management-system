'use client';

import { useState } from 'react';
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

import { generatePhysicalVerificationItemsAction } from '../actions/physical-verification.actions';

import { PhysicalVerificationItemTable } from './physical-verification-item-table';

type PhysicalVerificationDetailWorkspaceProps = {
  verification: PhysicalVerificationDetailWithRelations;
};

export function PhysicalVerificationDetailWorkspace({
  verification,
}: PhysicalVerificationDetailWorkspaceProps) {
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

        window.location.reload();
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
            <PhysicalVerificationItemTable
              items={verification.items}
              verificationId={verification.id}
            />
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
                    <TableHead>Observed By</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {verification.unregisteredObservations.map((observation) => (
                    <TableRow key={observation.id}>
                      <TableCell className="font-medium">
                        {observation.observedName}
                      </TableCell>

                      <TableCell>
                        {observation.observedAssetTag || '-'}
                      </TableCell>

                      <TableCell>
                        {observation.observedSerialNumber || '-'}
                      </TableCell>

                      <TableCell>
                        {observation.observedLocationId || '-'}
                      </TableCell>

                      <TableCell>
                        {observation.observedConditionId || '-'}
                      </TableCell>

                      <TableCell>
                        {observation.observedAt.toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        {observation.observedByUser.displayName}
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
