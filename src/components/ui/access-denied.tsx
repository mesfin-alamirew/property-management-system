import Link from 'next/link';

import { Button } from './button';

export function AccessDenied() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Access denied</p>

          <h1 className="text-2xl font-semibold text-gray-900">
            You don&apos;t have permission to access this page
          </h1>

          <p className="text-sm text-gray-600">
            Your account does not have the required permission for this
            resource. Please contact your System Administrator if you believe
            you should have access.
          </p>
        </div>

        <Button asChild variant="secondary">
          <Link href="/buildings">Go to Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
