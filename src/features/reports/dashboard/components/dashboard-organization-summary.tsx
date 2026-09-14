import Link from 'next/link';

import { EmptyState } from '@/components/ui/empty-state';
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
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Organization Overview
          </h2>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            Asset distribution and high-priority accountability exceptions by
            organizational unit.
          </p>
        </div>

        <Link
          href="/reports/assets"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1"
        >
          View Asset Report
        </Link>
      </div>

      {organizations.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            title="No organization data"
            description="No organization data is available for the current scope."
          />
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
                      <p className="font-medium text-foreground">
                        {organization.organizationUnit.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
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
                          ? 'font-semibold text-danger'
                          : 'text-muted-foreground'
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
