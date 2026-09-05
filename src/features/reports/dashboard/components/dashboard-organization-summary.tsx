import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { DashboardOrganizationSummaryRow } from '../types/dashboard.types';

type DashboardOrganizationSummaryProps = {
  organizations: DashboardOrganizationSummaryRow[];
};

export function DashboardOrganizationSummary({
  organizations,
}: DashboardOrganizationSummaryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Organization Overview
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Asset distribution and high-priority accountability exceptions by
            organizational unit.
          </p>
        </div>

        <Link
          href="/reports/assets"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          View Asset Report
        </Link>
      </div>

      {organizations.length === 0 ? (
        <div className="mt-5 rounded-md border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600">
            No organization data is available for the current scope.
          </p>
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization Unit</TableHead>
                <TableHead>Total Assets</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Unassigned</TableHead>
                <TableHead>High Exceptions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {organizations.map((organization) => (
                <TableRow key={organization.organizationUnit.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">
                        {organization.organizationUnit.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {organization.organizationUnit.code}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    {organization.totalAssets.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {organization.assignedAssets.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {organization.unassignedAssets.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <span
                      className={
                        organization.highExceptions > 0
                          ? 'font-semibold text-red-700'
                          : 'text-gray-700'
                      }
                    >
                      {organization.highExceptions.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
