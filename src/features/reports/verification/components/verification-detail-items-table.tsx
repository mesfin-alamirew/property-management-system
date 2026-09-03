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
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
        No verification items found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Expected Tag</TableHead>
            <TableHead>Observed Tag</TableHead>
            <TableHead>Expected Serial</TableHead>
            <TableHead>Observed Serial</TableHead>
            <TableHead>Expected Employee</TableHead>
            <TableHead>Observed Employee</TableHead>
            <TableHead>Expected Location</TableHead>
            <TableHead>Observed Location</TableHead>
            <TableHead>Expected Condition</TableHead>
            <TableHead>Observed Condition</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Verified By</TableHead>
            <TableHead>Verified At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">
                    {item.asset.assetCode}
                  </div>
                  <div className="text-sm text-gray-500">{item.asset.name}</div>
                </div>
              </TableCell>

              <TableCell>{item.expectedAssetTag || '—'}</TableCell>

              <TableCell>{item.observedAssetTag || '—'}</TableCell>

              <TableCell>{item.expectedSerialNumber || '—'}</TableCell>

              <TableCell>{item.observedSerialNumber || '—'}</TableCell>

              <TableCell>
                {formatEmployee(
                  item.expectedEmployee,
                  item.expectedEmployeeNumber,
                  item.expectedEmployeeName,
                )}
              </TableCell>

              <TableCell>
                {item.observedEmployeeNumber && item.observedEmployeeName
                  ? `${item.observedEmployeeNumber} - ${item.observedEmployeeName}`
                  : item.observedEmployeeNumber ||
                    item.observedEmployeeName ||
                    '—'}
              </TableCell>

              <TableCell>
                {formatLocation(
                  item.expectedLocation,
                  item.expectedLocationCode,
                  item.expectedLocationName,
                )}
              </TableCell>

              <TableCell>
                {item.observedLocationCode && item.observedLocationName
                  ? `${item.observedLocationCode} - ${item.observedLocationName}`
                  : item.observedLocationCode ||
                    item.observedLocationName ||
                    '—'}
              </TableCell>

              <TableCell>
                {item.expectedConditionCode && item.expectedConditionName
                  ? `${item.expectedConditionCode} - ${item.expectedConditionName}`
                  : item.expectedConditionCode ||
                    item.expectedConditionName ||
                    '—'}
              </TableCell>

              <TableCell>
                {item.observedConditionCode && item.observedConditionName
                  ? `${item.observedConditionCode} - ${item.observedConditionName}`
                  : item.observedConditionCode ||
                    item.observedConditionName ||
                    '—'}
              </TableCell>

              <TableCell>{formatResult(item.result)}</TableCell>

              <TableCell>{item.verifiedByUser?.displayName || '—'}</TableCell>

              <TableCell>{formatDate(item.verifiedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
