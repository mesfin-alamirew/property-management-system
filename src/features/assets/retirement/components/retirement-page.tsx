import {
  getRetirements,
  getAssets,
  getConditions,
} from '../queries/retirement.queries';

import { RetirementWorkspace } from './retirement-workspace';

export async function RetirementPage() {
  const [retirements, assets, conditions] = await Promise.all([
    getRetirements(),
    getAssets(),
    getConditions(),
  ]);

  return (
    <RetirementWorkspace
      retirements={retirements}
      assets={assets}
      conditions={conditions}
    />
  );
}
