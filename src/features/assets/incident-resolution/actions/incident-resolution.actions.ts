'use server';

import { incidentResolutionSchema } from '../schemas/incident-resolution.schema';
import { resolveIncident } from '../commands/incident-resolution.commands';

import { requireCurrentUser } from '@/lib/auth/require-current-user';

type ActionResult<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function resolveIncidentAction(
  incidentId: string,
  formData: unknown,
): Promise<ActionResult> {
  try {
    const data = incidentResolutionSchema.parse(formData);

    const user = await requireCurrentUser();

    await resolveIncident(user.id, incidentId, data);

    return {
      success: true,
      message: 'Incident resolved successfully',
    };
  } catch (error) {
    console.error('RESOLVE INCIDENT ERROR:', error);

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
}
