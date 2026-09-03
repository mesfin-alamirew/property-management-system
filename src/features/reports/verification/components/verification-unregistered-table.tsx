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
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
        No unregistered asset observations found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Observed Asset Name</TableHead>
            <TableHead>Observed Asset Tag</TableHead>
            <TableHead>Observed Serial Number</TableHead>
            <TableHead>Observed Location</TableHead>
            <TableHead>Observed Condition</TableHead>
            <TableHead>Observed By</TableHead>
            <TableHead>Observed At</TableHead>
            <TableHead>Registered Asset</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {observations.map((observation) => (
            <TableRow key={observation.id}>
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">
                    {observation.observedName}
                  </div>
                  {observation.notes ? (
                    <div className="mt-1 text-sm text-gray-500">
                      {observation.notes}
                    </div>
                  ) : null}
                </div>
              </TableCell>

              <TableCell>{observation.observedAssetTag || '—'}</TableCell>

              <TableCell>{observation.observedSerialNumber || '—'}</TableCell>

              <TableCell>
                {formatLocation(
                  observation.observedLocation,
                  observation.observedLocationCode,
                  observation.observedLocationName,
                )}
              </TableCell>

              <TableCell>
                {formatCondition(
                  observation.observedConditionCode,
                  observation.observedConditionName,
                )}
              </TableCell>

              <TableCell>{observation.observedByUser.displayName}</TableCell>

              <TableCell>{formatDate(observation.observedAt)}</TableCell>

              <TableCell>
                {observation.registeredAsset ? (
                  <div>
                    <div className="font-medium text-gray-900">
                      {observation.registeredAsset.assetCode}
                    </div>
                    <div className="text-sm text-gray-500">
                      {observation.registeredAsset.name}
                    </div>
                  </div>
                ) : (
                  'Not Registered'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
