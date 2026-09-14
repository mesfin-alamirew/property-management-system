import { notFound } from 'next/navigation';

import { AccessDenied } from '@/components/ui/access-denied';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';

import { getPhysicalVerificationItemById } from '../queries/physical-verification.queries';
import { PhysicalVerificationItemForm } from './physical-verification-item-form';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

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
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Verification Context
            </h2>

            <p className="text-sm leading-5 text-muted-foreground">
              Asset and verification information for this verification item.
            </p>
          </div>

          <div className="rounded-md border border-border bg-surface">
            <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Verification
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {item.verification.referenceNumber}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Verification Status
                </p>

                <div className="mt-1">
                  <span className="inline-flex items-center rounded-full bg-info-surface px-2 py-1 text-xs font-medium text-info">
                    {item.verification.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Asset Code
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {item.expectedAssetCode}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Asset Name
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {item.expectedAssetName}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Verification Details
            </h2>

            <p className="text-sm leading-5 text-muted-foreground">
              Record the physical verification result and observed asset
              information.
            </p>
          </div>

          <PhysicalVerificationItemForm item={item} />
        </section>
      </div>
    </MasterDataLayout>
  );
}
