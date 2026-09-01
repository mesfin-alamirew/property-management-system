'use server';

import { revalidatePath } from 'next/cache';

import { AppError } from '@/lib/errors';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import type { ActionResult } from '@/types/action-result';

import {
  createIncident,
  updateIncident,
  reportIncident,
  assignIncident,
  startIncident,
  resolveIncident,
  closeIncident,
  cancelIncident,
} from '../commands/incident.commands';

import { incidentSchema } from '../schemas/incident.schema';
import type { IncidentFormData } from '../schemas/incident.schema';

type IncidentActionData = {
  id: string;
};

export async function createIncidentAction(
  data: IncidentFormData,
): Promise<ActionResult<IncidentActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await createIncident(user.id, data);

    revalidatePath('/incidents');

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

    console.error('CREATE INCIDENT ERROR:', error);

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
}

export async function updateIncidentAction(
  id: string,
  data: IncidentFormData,
): Promise<ActionResult<IncidentActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await updateIncident(user.id, id, data);

    revalidatePath('/incidents');
    revalidatePath(`/incidents/${id}`);

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

    console.error('UPDATE INCIDENT ERROR:', error);

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
}

export async function reportIncidentAction(
  incidentId: string,
): Promise<ActionResult<IncidentActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await reportIncident(user.id, incidentId);

    revalidatePath('/incidents');
    revalidatePath(`/incidents/${incidentId}`);

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

export async function assignIncidentAction(
  incidentId: string,
  assignedToUserId: string,
): Promise<ActionResult<IncidentActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await assignIncident(user.id, incidentId, assignedToUserId);

    revalidatePath('/incidents');
    revalidatePath(`/incidents/${incidentId}`);

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

export async function startIncidentAction(
  incidentId: string,
): Promise<ActionResult<IncidentActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await startIncident(user.id, incidentId);

    revalidatePath('/incidents');
    revalidatePath(`/incidents/${incidentId}`);

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

export async function resolveIncidentAction(
  incidentId: string,
): Promise<ActionResult<IncidentActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await resolveIncident(user.id, incidentId);

    revalidatePath('/incidents');
    revalidatePath(`/incidents/${incidentId}`);

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

export async function closeIncidentAction(
  incidentId: string,
): Promise<ActionResult<IncidentActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await closeIncident(user.id, incidentId);

    revalidatePath('/incidents');
    revalidatePath(`/incidents/${incidentId}`);

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

export async function cancelIncidentAction(
  incidentId: string,
): Promise<ActionResult<IncidentActionData>> {
  try {
    const user = await requireCurrentUser();

    const result = await cancelIncident(user.id, incidentId);

    revalidatePath('/incidents');
    revalidatePath(`/incidents/${incidentId}`);

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
