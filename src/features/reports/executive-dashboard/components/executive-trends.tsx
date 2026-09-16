'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type {
  ExecutiveDashboardMaintenanceIncidentTrendRow,
  ExecutiveDashboardTrendRow,
} from '../types/executive-dashboard.types';

type ExecutiveTrendsProps = {
  acquisitionTrend: ExecutiveDashboardTrendRow[];
  maintenanceIncidentTrend: ExecutiveDashboardMaintenanceIncidentTrendRow[];
};

type AcquisitionTrendChartProps = {
  data: ExecutiveDashboardTrendRow[];
};

type MaintenanceIncidentTrendChartProps = {
  data: ExecutiveDashboardMaintenanceIncidentTrendRow[];
};

function AcquisitionTrendChart({ data }: AcquisitionTrendChartProps) {
  const hasData = data.some((item) => item.count > 0);

  if (!hasData) {
    return (
      <div className="mt-4 flex min-h-72 items-center justify-center rounded-md border border-border bg-surface-muted px-4 text-center text-sm text-muted-foreground">
        No acquisition activity is available for the selected period.
      </div>
    );
  }

  return (
    <div className="mt-4 h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            formatter={(value) => [
              Number(value).toLocaleString(),
              'Acquisitions',
            ]}
          />

          <Line
            type="monotone"
            dataKey="count"
            name="Acquisitions"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function MaintenanceIncidentTrendChart({
  data,
}: MaintenanceIncidentTrendChartProps) {
  const hasData = data.some(
    (item) => item.maintenance > 0 || item.incidents > 0,
  );

  if (!hasData) {
    return (
      <div className="mt-4 flex min-h-72 items-center justify-center rounded-md border border-border bg-surface-muted px-4 text-center text-sm text-muted-foreground">
        No maintenance or incident activity is available for the selected
        period.
      </div>
    );
  }

  return (
    <div className="mt-4 h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            formatter={(value, name) => [Number(value).toLocaleString(), name]}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="maintenance"
            name="Maintenance"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="incidents"
            name="Incidents"
            stroke="#dc2626"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ExecutiveTrends({
  acquisitionTrend,
  maintenanceIncidentTrend,
}: ExecutiveTrendsProps) {
  return (
    <section
      aria-labelledby="executive-trends-heading"
      className="rounded-lg border border-border bg-surface p-6 shadow-sm"
    >
      <div>
        <h2
          id="executive-trends-heading"
          className="text-lg font-semibold text-foreground"
        >
          Operational trends
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Acquisition, maintenance, and incident activity over the last 13
          months.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Acquisition activity
          </h3>

          <AcquisitionTrendChart data={acquisitionTrend} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Maintenance vs incidents
          </h3>

          <MaintenanceIncidentTrendChart data={maintenanceIncidentTrend} />
        </div>
      </div>
    </section>
  );
}
