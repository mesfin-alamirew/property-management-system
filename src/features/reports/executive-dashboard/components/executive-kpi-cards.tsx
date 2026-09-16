import type { ExecutiveDashboardKpis } from '../types/executive-dashboard.types';

type ExecutiveKpiCardsProps = {
  kpis: ExecutiveDashboardKpis;
};

const cards = [
  {
    key: 'totalProperties',
    label: 'Properties',
    description: 'Active properties',
  },
  {
    key: 'totalBuildings',
    label: 'Buildings',
    description: 'Active buildings',
  },
  {
    key: 'totalAssets',
    label: 'Assets',
    description: 'Recorded assets',
  },
  {
    key: 'totalEmployees',
    label: 'Employees',
    description: 'Active employees',
  },
  {
    key: 'totalAcquisitions',
    label: 'Acquisitions',
    description: 'Recorded acquisitions',
  },
  {
    key: 'totalOrganizationUnits',
    label: 'Organization Units',
    description: 'Active organizational units',
  },
] as const;

export function ExecutiveKpiCards({ kpis }: ExecutiveKpiCardsProps) {
  return (
    <section aria-labelledby="executive-kpi-heading">
      <div className="mb-4">
        <h2
          id="executive-kpi-heading"
          className="text-lg font-semibold text-foreground"
        >
          Organization overview
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Current scale of the organization&apos;s property and asset portfolio.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((card) => (
          <div
            key={card.key}
            className="rounded-lg border border-border bg-surface p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {card.label}
            </p>

            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              {kpis[card.key].toLocaleString()}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
