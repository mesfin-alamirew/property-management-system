import { NextResponse } from 'next/server';

import { resolveAuthenticatedUser } from '@/lib/auth/identity-mapping.service';
import { authenticateAzureAd } from '@/lib/auth/azure-ad/azure-ad.authentication';
import { startUserSession } from '@/lib/auth/session-manager';

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

    if (!user) {
      return NextResponse.redirect(
        new URL('/login?error=user_not_registered', url),
      );
    }

    await startUserSession(user.id);

    return NextResponse.redirect(new URL('/buildings', url));
  } catch {
    return NextResponse.redirect(
      new URL('/login?error=authentication_failed', url),
    );
  }
}
