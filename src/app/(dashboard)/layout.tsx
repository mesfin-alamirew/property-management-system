import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth/current-user';
import { logoutAction } from '@/lib/auth/logout.action';

import { AppSidebar } from '@/components/navigation/app-sidebar';

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
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-lg font-semibold">
                  Property Management System
                </h1>
              </div>

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

          <main className="min-w-0 flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
