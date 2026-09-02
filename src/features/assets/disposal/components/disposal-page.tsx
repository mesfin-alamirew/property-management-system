import {
  getDisposals,
  getAvailableAssetsForDisposal,
} from '../queries/disposal.queries';

import { DisposalWorkspace } from './disposal-workspace';

export async function DisposalPage() {
  const [disposals, assets] = await Promise.all([
    getDisposals(),
    getAvailableAssetsForDisposal(),
  ]);

  return <DisposalWorkspace disposals={disposals} assets={assets} />;
}
