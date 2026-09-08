import { RoleUsersPage } from '@/features/administration/role/components/role-users.page';

type PageProps = {
  params: Promise<{
    roleId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { roleId } = await params;

  return <RoleUsersPage roleId={roleId} />;
}
