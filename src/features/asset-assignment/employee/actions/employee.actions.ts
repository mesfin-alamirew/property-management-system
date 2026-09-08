'use server';

import { revalidatePath } from 'next/cache';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import type { ActionResult } from '@/types/action-result';

import {
  createEmployee,
  updateEmployee,
  deactivateEmployee,
} from '../commands/employee.commands';

import { employeeSchema } from '../schemas/employee.schema';

type EmployeeActionData = {
  id: string;
};

export async function createEmployeeAction(
  formData: unknown,
): Promise<ActionResult<EmployeeActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = employeeSchema.parse(formData);

    const result = await createEmployee(user.id, data);

    revalidatePath('/employees');

    return {
      success: true,
      data: {
        id: result.id,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
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
}

export async function updateEmployeeAction(
  id: string,
  formData: unknown,
): Promise<ActionResult<EmployeeActionData>> {
  try {
    const user = await requireCurrentUser();

    const data = employeeSchema.parse(formData);

    const result = await updateEmployee(user.id, id, data);

    revalidatePath('/employees');

    return {
      success: true,
      data: {
        id: result.id,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
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
}

export async function deactivateEmployeeAction(
  id: string,
): Promise<ActionResult<EmployeeActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await deactivateEmployee(user.id, id);

    revalidatePath('/employees');

    return {
      success: true,
      data: {
        id: result.id,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
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
}
