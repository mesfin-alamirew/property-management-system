import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PhysicalVerificationDetailItem } from '../types/verification.types';

type VerificationDetailItemsTableProps = {
  items: PhysicalVerificationDetailItem[];
};

function formatDate(date: Date | null) {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

function formatResult(result: PhysicalVerificationDetailItem['result']) {
  switch (result) {
    case 'PENDING':
      return 'Pending';
    case 'VERIFIED':
      return 'Verified';
    case 'NOT_FOUND':
      return 'Not Found';
    case 'LOCATION_MISMATCH':
      return 'Location Mismatch';
    case 'CUSTODIAN_MISMATCH':
      return 'Custodian Mismatch';
    case 'CONDITION_MISMATCH':
      return 'Condition Mismatch';
    case 'IDENTIFICATION_MISMATCH':
      return 'Identification Mismatch';
    case 'MULTIPLE_DISCREPANCIES':
      return 'Multiple Discrepancies';
    default:
      return result;
  }
}

function formatEmployee(
  employee: PhysicalVerificationDetailItem['expectedEmployee'],
  fallbackNumber: string | null,
  fallbackName: string | null,
) {
  if (employee) {
    return `${employee.employeeNumber} - ${employee.name}`;
  }

  if (fallbackNumber && fallbackName) {
    return `${fallbackNumber} - ${fallbackName}`;
  }

  return fallbackNumber || fallbackName || '—';
}

function formatLocation(
  location: PhysicalVerificationDetailItem['expectedLocation'],
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

export function VerificationDetailItemsTable({
  items,
}: VerificationDetailItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface-muted px-5 py-4">
        <p className="text-sm text-muted-foreground">
          No verification items found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60">
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Asset
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Expected Tag
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Observed Tag
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Expected Serial
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Observed Serial
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Expected Employee
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Observed Employee
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Expected Location
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Observed Location
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Expected Condition
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Observed Condition
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Result
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Verified By
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Verified At
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              className="transition-colors hover:bg-surface-muted/50"
            >
              <TableCell>
                <div className="min-w-40">
                  <div className="font-medium text-foreground">
                    {item.asset.assetCode}
                  </div>
                  <div className="mt-0.5 text-sm text-muted-foreground">
                    {item.asset.name}
                  </div>
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {item.expectedAssetTag || '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {item.observedAssetTag || '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {item.expectedSerialNumber || '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {item.observedSerialNumber || '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatEmployee(
                  item.expectedEmployee,
                  item.expectedEmployeeNumber,
                  item.expectedEmployeeName,
                )}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {item.observedEmployeeNumber && item.observedEmployeeName
                  ? `${item.observedEmployeeNumber} - ${item.observedEmployeeName}`
                  : item.observedEmployeeNumber ||
                    item.observedEmployeeName ||
                    '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatLocation(
                  item.expectedLocation,
                  item.expectedLocationCode,
                  item.expectedLocationName,
                )}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {item.observedLocationCode && item.observedLocationName
                  ? `${item.observedLocationCode} - ${item.observedLocationName}`
                  : item.observedLocationCode ||
                    item.observedLocationName ||
                    '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {item.expectedConditionCode && item.expectedConditionName
                  ? `${item.expectedConditionCode} - ${item.expectedConditionName}`
                  : item.expectedConditionCode ||
                    item.expectedConditionName ||
                    '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {item.observedConditionCode && item.observedConditionName
                  ? `${item.observedConditionCode} - ${item.observedConditionName}`
                  : item.observedConditionCode ||
                    item.observedConditionName ||
                    '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatResult(item.result)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {item.verifiedByUser?.displayName || '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(item.verifiedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
