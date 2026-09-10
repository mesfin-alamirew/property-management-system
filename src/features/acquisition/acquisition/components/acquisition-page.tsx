import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import {
  getAcquisitions,
  getActiveAcquisitionMethods,
} from '../queries/acquisition.queries';

import { AcquisitionWorkspace } from './acquisition-workspace';

export async function AcquisitionPage() {
  const user = await requireCurrentUser();

  let acquisitions;
  let acquisitionMethods;

  try {
    [acquisitions, acquisitionMethods] = await Promise.all([
      getAcquisitions(user.id),
      getActiveAcquisitionMethods(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

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
