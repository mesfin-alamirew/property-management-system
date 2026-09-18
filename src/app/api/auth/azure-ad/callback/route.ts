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
    console.error('[Azure AD callback] Azure AD returned an error');

    return NextResponse.redirect(new URL('/login?error=azure_ad', url));
  }

  if (!code) {
    console.error('[Azure AD callback] Authorization code is missing');

    return NextResponse.redirect(new URL('/login?error=missing_code', url));
  }

  try {
    console.log('[Azure AD callback] 1 - authenticateAzureAd');

    const identity = await authenticateAzureAd(code);

    console.log('[Azure AD callback] 2 - resolveAuthenticatedUser');

    const user = await resolveAuthenticatedUser(identity);

    console.log('[Azure AD callback] 3 - startUserSession');

    await startUserSession(user.id);

    console.log('[Azure AD callback] 4 - userHasActiveRole');

    const hasRole = await userHasActiveRole(user.id);

    console.log(`[Azure AD callback] 5 - redirect; hasRole=${hasRole}`);

    return NextResponse.redirect(
      new URL(hasRole ? '/' : '/public-access', url),
    );
  } catch (error) {
    console.error('[Azure AD callback] FAILED');

    if (error instanceof Error) {
      console.error(`[Azure AD callback] Error: ${error.message}`);
    } else {
      console.error('[Azure AD callback] Unknown error');
    }

    return NextResponse.redirect(
      new URL('/login?error=authentication_failed', url),
    );
  }
}

// import { NextResponse } from 'next/server';

// import { resolveAuthenticatedUser } from '@/lib/auth/identity-mapping.service';
// import { authenticateAzureAd } from '@/lib/auth/azure-ad/azure-ad.authentication';
// import { startUserSession } from '@/lib/auth/session-manager';
// import { userHasActiveRole } from '@/lib/auth/user-role.service';

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const code = url.searchParams.get('code');
//   const error = url.searchParams.get('error');

//   if (error) {
//     return NextResponse.redirect(new URL('/login?error=azure_ad', url));
//   }

//   if (!code) {
//     return NextResponse.redirect(new URL('/login?error=missing_code', url));
//   }

//   try {
//     const identity = await authenticateAzureAd(code);

//     const user = await resolveAuthenticatedUser(identity);

//     await startUserSession(user.id);

//     const hasRole = await userHasActiveRole(user.id);

//     return NextResponse.redirect(
//       new URL(hasRole ? '/' : '/public-access', url),
//     );
//   } catch {
//     return NextResponse.redirect(
//       new URL('/login?error=authentication_failed', url),
//     );
//   }
// }
