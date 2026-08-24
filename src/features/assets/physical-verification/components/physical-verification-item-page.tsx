import { notFound } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import { getPhysicalVerificationItemById } from '../queries/physical-verification.queries';
import { PhysicalVerificationItemForm } from './physical-verification-item-form';

type PhysicalVerificationItemPageProps = {
  itemId: string;
};

export async function PhysicalVerificationItemPage({
  itemId,
}: PhysicalVerificationItemPageProps) {
  const item = await getPhysicalVerificationItemById(itemId);

  if (!item) {
    notFound();
  }

  return (
    <MasterDataLayout
      title={`Verify ${item.expectedAssetName}`}
      description={`${item.verification.referenceNumber} - ${item.verification.title}`}
    >
      <div className="space-y-6">
        {/* Verification Context */}
        <section className="rounded-md border p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Verification</p>

              <p className="font-medium">{item.verification.referenceNumber}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Verification Status
              </p>

              <p className="font-medium">{item.verification.status}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Asset Code</p>

              <p className="font-medium">{item.expectedAssetCode}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Asset Name</p>

              <p className="font-medium">{item.expectedAssetName}</p>
            </div>
          </div>
        </section>

        {/* Verification Form */}
        <PhysicalVerificationItemForm item={item} />
      </div>
    </MasterDataLayout>
  );
}
