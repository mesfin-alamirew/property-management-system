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
    <section aria-labelledby="dashboard-organization-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="dashboard-organization-heading"
            className="text-sm font-semibold text-foreground"
          >
            Organization Overview
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Asset distribution and high-priority accountability exceptions by
            organizational unit.
          </p>
        </div>

        <Link
          href="/reports/assets"
          className={[
            'text-xs font-medium text-primary',
            'transition-colors hover:text-primary-hover',
            'focus:outline-none focus:ring-2 focus:ring-focus-ring',
            'focus:ring-offset-1',
          ].join(' ')}
        >
          View asset report →
        </Link>
      </div>

      {organizations.length === 0 ? (
        <div className="mt-4 rounded-lg border border-border bg-surface">
          <EmptyState
            title="No organization data"
            description="There are no organizational asset records matching the current dashboard filters."
          />
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization Unit</TableHead>
                  <TableHead className="text-right">Total Assets</TableHead>
                  <TableHead className="text-right">Assigned</TableHead>
                  <TableHead className="text-right">Unassigned</TableHead>
                  <TableHead className="text-right">High Exceptions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {organizations.map((organization) => {
                  const hasHighExceptions = organization.highExceptions > 0;

                  return (
                    <TableRow key={organization.organizationUnit.id}>
                      <TableCell>
                        <div className="min-w-48">
                          <p className="font-medium text-foreground">
                            {organization.organizationUnit.code}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {organization.organizationUnit.name}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="text-right font-medium tabular-nums text-foreground">
                        {organization.totalAssets.toLocaleString()}
                      </TableCell>

                      <TableCell className="text-right tabular-nums text-foreground">
                        {organization.assignedAssets.toLocaleString()}
                      </TableCell>

                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {organization.unassignedAssets.toLocaleString()}
                      </TableCell>

                      <TableCell
                        className={[
                          'text-right font-medium tabular-nums',
                          hasHighExceptions
                            ? 'font-semibold text-danger'
                            : 'text-muted-foreground',
                        ].join(' ')}
                      >
                        {organization.highExceptions.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </section>
  );
}
