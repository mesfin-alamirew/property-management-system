import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PhysicalVerificationUnregisteredObservation } from '../types/verification.types';

type VerificationUnregisteredTableProps = {
  observations: PhysicalVerificationUnregisteredObservation[];
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

function formatLocation(
  location: PhysicalVerificationUnregisteredObservation['observedLocation'],
  fallbackCode: string | null,
  fallbackName: string | null,
) {
  if (location) {
    return `${location.code} - ${location.name}`;
  }

  if (fallbackCode && fallbackName) {
    return `${fallbackCode} - ${fallbackName}`;
  }

  return fallbackCode || fallbackName || '—';
}

function formatCondition(code: string | null, name: string | null) {
  if (code && name) {
    return `${code} - ${name}`;
  }

  return code || name || '—';
}

export function VerificationUnregisteredTable({
  observations,
}: VerificationUnregisteredTableProps) {
  if (observations.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface-muted px-5 py-4 text-sm text-muted-foreground">
        No unregistered asset observations found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60 hover:bg-surface-muted/60">
            <TableHead className="font-semibold text-foreground">
              Observed Asset Name
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Observed Asset Tag
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Observed Serial Number
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Observed Location
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Observed Condition
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Observed By
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Observed At
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Registered Asset
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {observations.map((observation) => (
            <TableRow
              key={observation.id}
              className="transition-colors hover:bg-surface-muted/50"
            >
              <TableCell className="min-w-48">
                <div>
                  <div className="font-medium text-foreground">
                    {observation.observedName}
                  </div>

                  {observation.notes ? (
                    <div className="mt-1 text-sm leading-5 text-muted-foreground">
                      {observation.notes}
                    </div>
                  ) : null}
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {observation.observedAssetTag || '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {observation.observedSerialNumber || '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatLocation(
                  observation.observedLocation,
                  observation.observedLocationCode,
                  observation.observedLocationName,
                )}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatCondition(
                  observation.observedConditionCode,
                  observation.observedConditionName,
                )}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {observation.observedByUser.displayName}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(observation.observedAt)}
              </TableCell>

              <TableCell className="min-w-48">
                {observation.registeredAsset ? (
                  <div>
                    <div className="font-medium text-foreground">
                      {observation.registeredAsset.assetCode}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {observation.registeredAsset.name}
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Not Registered
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
