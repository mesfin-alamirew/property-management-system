'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { ExecutiveDashboardData } from '../types/executive-dashboard.types';

type ExecutiveOrganizationChartProps = {
  assetsByOrganization: ExecutiveDashboardData['assetsByOrganization'];
};

export function ExecutiveOrganizationChart({
  assetsByOrganization,
}: ExecutiveOrganizationChartProps) {
  const isSingleUnit = assetsByOrganization.length === 1;
  const singleUnit = assetsByOrganization[0];

  return (
    <section
      aria-labelledby="assets-by-organization-heading"
      className="rounded-lg border border-border bg-surface p-6 shadow-sm"
    >
      <div>
        <h2
          id="assets-by-organization-heading"
          className="text-lg font-semibold text-foreground"
        >
          Assets by organization unit
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Distribution of recorded assets across organization units with
          assigned asset locations.
        </p>
      </div>

      {assetsByOrganization.length === 0 ? (
        <div className="mt-6 flex min-h-72 items-center justify-center rounded-md border border-border bg-surface-muted px-4 text-center text-sm text-muted-foreground">
          No organization-level asset location data is available.
        </div>
      ) : isSingleUnit && singleUnit ? (
        <div className="mt-6 rounded-md border border-border bg-surface-muted p-6">
          <p className="text-sm font-medium text-muted-foreground">
            Organization unit
          </p>

          <p className="mt-2 text-xl font-semibold text-foreground">
            {singleUnit.name}
          </p>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Recorded assets</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                {singleUnit.count.toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Portfolio share</p>
              <p className="mt-1 text-lg font-semibold text-primary">100%</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={assetsByOrganization}
              layout="vertical"
              margin={{
                top: 4,
                right: 16,
                bottom: 4,
                left: 16,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />

              <XAxis
                type="number"
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={140}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value) => [
                  Number(value).toLocaleString(),
                  'Assets',
                ]}
              />

              <Bar
                dataKey="count"
                name="Assets"
                fill="#2563eb"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
