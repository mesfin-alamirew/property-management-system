import type { AuthProvider } from '@/generated/prisma/client';

export type AuthIdentity = {
  provider: AuthProvider;
  externalId: string;
  username?: string;
  displayName?: string;
};

export interface AuthProviderAdapter {
  getCurrentIdentity(): Promise<AuthIdentity | null>;
}

export type AuthenticatedUser = {
  id: string;
  employeeId: string | null;
  username: string;
  displayName: string;
};
