import { getCurrentUser } from '@/lib/auth/current-user';
import { logoutAction } from '@/lib/auth/logout.action';

export default async function PublicAccessPage() {
  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-lg space-y-6 rounded-lg border p-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            Welcome to the Property Management System
          </h1>

          <p className="text-sm text-muted-foreground">
            Your account has been successfully registered.
          </p>
        </div>

        <div className="rounded-md border p-4">
          <p className="text-sm">
            Signed in as{' '}
            <span className="font-medium">
              {user?.displayName ?? user?.username}
            </span>
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Your account is currently awaiting access assignment.</p>

          <p>
            Please contact the system administrator to have the appropriate role
            assigned to your account.
          </p>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full rounded-md border px-4 py-2 text-sm"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
