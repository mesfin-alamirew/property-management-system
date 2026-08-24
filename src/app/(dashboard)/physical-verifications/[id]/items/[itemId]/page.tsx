import { PhysicalVerificationItemPage } from '@/features/assets/physical-verification/components/physical-verification-item-page';

type PhysicalVerificationItemRoutePageProps = {
  params: Promise<{
    id: string;
    itemId: string;
  }>;
};

export default async function Page({
  params,
}: PhysicalVerificationItemRoutePageProps) {
  const { itemId } = await params;

  return <PhysicalVerificationItemPage itemId={itemId} />;
}
