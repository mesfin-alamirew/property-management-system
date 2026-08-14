'use server';

import { organizationUnitSchema } from '../schemas/organization-unit.schema';
import {
  createOrganizationUnit,
  updateOrganizationUnit,
  deactivateOrganizationUnit,
} from '../commands/organization-unit.commands';

import type { OrganizationUnit } from '@/generated/prisma/client';

import type { ActionResult } from '@/types/action-result';

export async function createOrganizationUnitAction(
  input: unknown,
): Promise<ActionResult<OrganizationUnit>> {
  try {
    const data = organizationUnitSchema.parse(input);

    const organizationUnit = await createOrganizationUnit(data);

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
    const data = organizationUnitSchema.parse(input);

    const organizationUnit = await updateOrganizationUnit(id, data);

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
    const organizationUnit = await deactivateOrganizationUnit(id);

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
