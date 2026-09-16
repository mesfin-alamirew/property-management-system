'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import type { ExecutiveDashboardData } from '../types/executive-dashboard.types';

type ExecutiveAssetCompositionProps = {
  assetComposition: ExecutiveDashboardData['assetComposition'];
};

type CompositionChartProps = {
  title: string;
  data: ExecutiveDashboardData['assetComposition']['byCategory'];
};

const CHART_COLORS = [
  '#2563eb',
  '#16a34a',
  '#f59e0b',
  '#dc2626',
  '#7c3aed',
  '#0891b2',
  '#db2777',
  '#65a30d',
];

function CompositionChart({ title, data }: CompositionChartProps) {
  return (
    <div className="min-w-0">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>

      {data.length === 0 ? (
        <div className="mt-4 flex min-h-64 items-center justify-center rounded-md border border-border bg-surface-muted px-4 text-center text-sm text-muted-foreground">
          No data available.
        </div>
      ) : (
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={2}
              >
                {data.map((item, index) => (
                  <Cell
                    key={item.id}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  Number(value).toLocaleString(),
                  'Assets',
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {data.length > 0 ? (
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                  }}
                />

                <span className="truncate text-muted-foreground">
                  {item.name}
                </span>
              </div>

              <span className="shrink-0 font-medium text-foreground">
                {item.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ExecutiveAssetComposition({
  assetComposition,
}: ExecutiveAssetCompositionProps) {
  return (
    <section
      aria-labelledby="asset-composition-heading"
      className="rounded-lg border border-border bg-surface p-6 shadow-sm"
    >
      <div>
        <h2
          id="asset-composition-heading"
          className="text-lg font-semibold text-foreground"
        >
          Asset composition
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Distribution of recorded assets across category, status, and
          condition.
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <CompositionChart
          title="By category"
          data={assetComposition.byCategory}
        />

        <CompositionChart title="By status" data={assetComposition.byStatus} />

        <CompositionChart
          title="By condition"
          data={assetComposition.byCondition}
        />
      </div>
    </section>
  );
}
