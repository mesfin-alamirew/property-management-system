import { RolePermissionsPage } from '@/features/administration/role/components/role-permissions.page';

type PageProps = {
  params: Promise<{
    roleId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { roleId } = await params;

  return <RolePermissionsPage roleId={roleId} />;
}
