export type AuthorizationRequest = {
  userId: string;
  permissionCode: string;
};

export type AuthorizationResult = {
  allowed: boolean;
};
