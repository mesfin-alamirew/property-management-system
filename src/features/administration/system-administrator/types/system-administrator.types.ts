export type SystemAdministratorListItem = {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  assignedAt: Date;
  assignedByUserId: string;
  assignedByUsername: string;
};

export type AssignSystemAdministratorInput = {
  targetUserId: string;
};
