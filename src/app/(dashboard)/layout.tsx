import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth/current-user';
import { logoutAction } from '@/lib/auth/logout.action';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold">Property Management System</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm">{user.displayName}</span>

            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md border px-3 py-2 text-sm"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
