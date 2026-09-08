'use server';

import { organizationUnitSchema } from '../schemas/organization-unit.schema';

import {
  createOrganizationUnit,
  updateOrganizationUnit,
  deactivateOrganizationUnit,
} from '../commands/organization-unit.commands';

import { requireCurrentUser } from '@/lib/auth/require-current-user';

import type { OrganizationUnit } from '@/generated/prisma/client';

import type { ActionResult } from '@/types/action-result';

export async function createOrganizationUnitAction(
  input: unknown,
): Promise<ActionResult<OrganizationUnit>> {
  try {
    const user = await requireCurrentUser();

    const data = organizationUnitSchema.parse(input);

    const organizationUnit = await createOrganizationUnit(user.id, data);

    return {
      success: true,
      data: organizationUnit,
    };
  } catch (error) {
    return handleOrganizationUnitActionError(error);
  }
}

export async function updateOrganizationUnitAction(
  id: string,
  input: unknown,
): Promise<ActionResult<OrganizationUnit>> {
  try {
    const user = await requireCurrentUser();

    const data = organizationUnitSchema.parse(input);

    const organizationUnit = await updateOrganizationUnit(user.id, id, data);

    return {
      success: true,
      data: organizationUnit,
    };
  } catch (error) {
    return handleOrganizationUnitActionError(error);
  }
}

export async function deactivateOrganizationUnitAction(
  id: string,
): Promise<ActionResult<OrganizationUnit>> {
  try {
    const user = await requireCurrentUser();

    const organizationUnit = await deactivateOrganizationUnit(user.id, id);

    return {
      success: true,
      data: organizationUnit,
    };
  } catch (error) {
    return handleOrganizationUnitActionError(error);
  }
}

function handleOrganizationUnitActionError(
  error: unknown,
): ActionResult<never> {
  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: false,
    message: 'Something went wrong',
  };
}
