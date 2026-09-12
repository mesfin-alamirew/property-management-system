import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { getDisposalDetail } from '@/features/reports/disposal/queries/disposal-detail.queries';
import { DisposalDetailPage } from '@/features/reports/disposal/components/disposal-detail-page';

type DisposalDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: DisposalDetailRouteProps) {
  const { id } = await params;

  const user = await requireCurrentUser();

  let disposal;

  try {
    disposal = await getDisposalDetail(user.id, id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  if (!disposal) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Disposal Detail
        </h1>

        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Disposal record not found.
        </div>
      </div>
    );
  }

  return <DisposalDetailPage disposal={disposal} />;
}
