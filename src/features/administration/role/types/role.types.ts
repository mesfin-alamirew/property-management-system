export type RoleListItem = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type RoleDetails = RoleListItem & {
  permissionCount: number;
  activeUserCount: number;
};

export type RolePermissionItem = {
  id: string;
  code: string;
  resource: string;
  action: string;
  description: string | null;
  isActive: boolean;
};

export type UserRoleItem = {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  roleId: string;
  roleCode: string;
  roleName: string;
  assignedAt: Date;
  assignedByUserId: string;
  assignedByUsername: string;
  removedAt: Date | null;
  removedByUserId: string | null;
  removedByUsername: string | null;
};
export type CreateRoleInput = {
  code: string;
  name: string;
  description?: string | null;
};

export type UpdateRoleInput = {
  name: string;
  description?: string | null;
};

export type AddPermissionToRoleInput = {
  roleId: string;
  permissionId: string;
};

export type RemovePermissionFromRoleInput = {
  roleId: string;
  permissionId: string;
};

export type AssignRoleToUserInput = {
  userId: string;
  roleId: string;
};
