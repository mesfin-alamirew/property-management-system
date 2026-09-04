import { AssetDetailPage } from '@/features/reports/asset/components/asset-detail-page';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <AssetDetailPage assetId={id} />;
}
