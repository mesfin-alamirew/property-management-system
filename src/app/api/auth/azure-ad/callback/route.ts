import { NextResponse } from 'next/server';

import { resolveAuthenticatedUser } from '@/lib/auth/identity-mapping.service';
import { authenticateAzureAd } from '@/lib/auth/azure-ad/azure-ad.authentication';
import { startUserSession } from '@/lib/auth/session-manager';
import { userHasActiveRole } from '@/lib/auth/user-role.service';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/login?error=azure_ad', url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', url));
  }

  try {
    const identity = await authenticateAzureAd(code);

    const user = await resolveAuthenticatedUser(identity);

    await startUserSession(user.id);

    const hasRole = await userHasActiveRole(user.id);

    return NextResponse.redirect(
      new URL(hasRole ? '/buildings' : '/public-access', url),
    );
  } catch {
    return NextResponse.redirect(
      new URL('/login?error=authentication_failed', url),
    );
  }
}
