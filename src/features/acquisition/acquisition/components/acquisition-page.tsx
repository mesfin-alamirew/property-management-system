import {
  getAcquisitions,
  getActiveAcquisitionMethods,
} from '../queries/acquisition.queries';

import { AcquisitionWorkspace } from './acquisition-workspace';

export async function AcquisitionPage() {
  const [acquisitions, acquisitionMethods] = await Promise.all([
    getAcquisitions(),
    getActiveAcquisitionMethods(),
  ]);

  const serializedAcquisitions = acquisitions.map((acquisition) => ({
    ...acquisition,

    totalAmount: acquisition.totalAmount?.toString() ?? null,

    items: acquisition.items.map((item) => ({
      ...item,

      unitCost: item.unitCost?.toString() ?? null,
      totalCost: item.totalCost?.toString() ?? null,
    })),
  }));

  return (
    <AcquisitionWorkspace
      acquisitions={serializedAcquisitions}
      acquisitionMethods={acquisitionMethods}
    />
  );
}
