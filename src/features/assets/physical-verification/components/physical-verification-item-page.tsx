import { notFound } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import { getPhysicalVerificationItemById } from '../queries/physical-verification.queries';
import { PhysicalVerificationItemForm } from './physical-verification-item-form';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

type PhysicalVerificationItemPageProps = {
  itemId: string;
};

export async function PhysicalVerificationItemPage({
  itemId,
}: PhysicalVerificationItemPageProps) {
  const user = await requireCurrentUser();

  let item;

  try {
    item = await getPhysicalVerificationItemById(user.id, itemId);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

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
