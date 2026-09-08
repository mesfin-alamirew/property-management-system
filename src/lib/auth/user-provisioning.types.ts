import type { AuthProvider } from '@/generated/prisma/client';

export type ProvisionUserInput = {
  provider: AuthProvider;
  externalId: string;
  username?: string;
  displayName?: string;
};

export type ProvisionedUser = {
  id: string;
  employeeId: string | null;
  username: string;
  displayName: string;
  isNew: boolean;
};
