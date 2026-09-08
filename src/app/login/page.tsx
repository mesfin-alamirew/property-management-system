import { azureAdLoginAction } from '@/lib/auth/azure-ad/azure-ad.action';
import { devLoginAction } from '@/lib/auth/dev-auth.action';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 rounded-lg border p-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">PMS Login</h1>

          <p className="text-sm text-muted-foreground">
            Sign in to the Property Management System
          </p>
        </div>

        <div className="space-y-3">
          <form action={azureAdLoginAction}>
            <button
              type="submit"
              className="w-full rounded-md border px-4 py-2 text-sm"
            >
              Sign in with Microsoft
            </button>
          </form>

          <form action={devLoginAction}>
            <button
              type="submit"
              className="w-full rounded-md border px-4 py-2 text-sm"
            >
              Login as Development User
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

// import { devLoginAction } from '@/lib/auth/dev-auth.action';

// export default function LoginPage() {
//   return (
//     <main className="flex min-h-screen items-center justify-center">
//       <div className="w-full max-w-sm space-y-6 rounded-lg border p-8">
//         <div className="space-y-2">
//           <h1 className="text-2xl font-semibold">PMS Login</h1>

//           <p className="text-sm text-muted-foreground">
//             Development authentication
//           </p>
//         </div>

//         <form action={devLoginAction}>
//           <button
//             type="submit"
//             className="w-full rounded-md border px-4 py-2 text-sm"
//           >
//             Login as Development User
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }
