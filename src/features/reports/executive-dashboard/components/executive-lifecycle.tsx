'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { ExecutiveDashboardData } from '../types/executive-dashboard.types';

type ExecutiveLifecycleProps = {
  retirementActivity: ExecutiveDashboardData['retirementActivity'];
  disposalActivity: ExecutiveDashboardData['disposalActivity'];
};

export function ExecutiveLifecycle({
  retirementActivity,
  disposalActivity,
}: ExecutiveLifecycleProps) {
  const data = retirementActivity.map((item, index) => ({
    period: item.period,
    retirement: item.count,
    disposal: disposalActivity[index]?.count ?? 0,
  }));

  const hasData = data.some((item) => item.retirement > 0 || item.disposal > 0);

  return (
    <section
      aria-labelledby="lifecycle-activity-heading"
      className="rounded-lg border border-border bg-surface p-6 shadow-sm"
    >
      <div>
        <h2
          id="lifecycle-activity-heading"
          className="text-lg font-semibold text-foreground"
        >
          Asset lifecycle activity
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Retirement and disposal activity recorded over the last 13 months.
        </p>
      </div>

      {!hasData ? (
        <div className="mt-6 flex min-h-72 items-center justify-center rounded-md border border-border bg-surface-muted px-4 text-center text-sm text-muted-foreground">
          No retirement or disposal activity is available for the selected
          period.
        </div>
      ) : (
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 8,
                right: 16,
                bottom: 8,
                left: 8,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="period" tickLine={false} axisLine={false} />

              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />

              <Tooltip
                formatter={(value, name) => [
                  Number(value).toLocaleString(),
                  name,
                ]}
              />

              <Legend />

              <Bar
                dataKey="retirement"
                name="Retirements"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="disposal"
                name="Disposals"
                fill="#dc2626"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
