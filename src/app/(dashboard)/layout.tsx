import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { NavigationShell } from '@/components/navigation/navigation-shell';

import { getCurrentUser } from '@/lib/auth/current-user';
import { logoutAction } from '@/lib/auth/logout.action';

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <NavigationShell
      headerRight={
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-foreground">
              {user.displayName}
            </p>
            <p className="text-xs text-muted-foreground">Signed in</p>
          </div>

          <form action={logoutAction}>
            <Button type="submit" variant="secondary">
              Logout
            </Button>
          </form>
        </div>
      }
    >
      {children}
    </NavigationShell>
  );
}
