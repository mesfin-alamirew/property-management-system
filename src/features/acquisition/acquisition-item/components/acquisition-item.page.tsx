import { getAcquisitions } from '../../acquisition/queries/acquisition.queries';

import {
  getAcquisitionItems,
  getAvailableAssetsForAcquisition,
} from '../queries/acquisition-item.queries';

import { AcquisitionItemWorkspace } from './acquisition-item-workspace';

export async function AcquisitionItemPage() {
  const [acquisitionItems, acquisitions, assets] = await Promise.all([
    getAcquisitionItems(),
    getAcquisitions(),
    getAvailableAssetsForAcquisition(),
  ]);

  return (
    <AcquisitionItemWorkspace
      acquisitionItems={acquisitionItems}
      acquisitions={acquisitions}
      assets={assets}
    />
  );
}
