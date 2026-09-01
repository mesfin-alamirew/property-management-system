import { AppError } from '@/lib/errors';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { prisma } from '@/lib/prisma';

import { recordAuditEvent } from '@/lib/audit/audit.service';

import type { IncidentResolutionFormData } from '../types/incident-resolution.types';

export async function resolveIncident(
  userId: string,
  incidentId: string,
  data: IncidentResolutionFormData,
) {
  return prisma.$transaction(async (tx) => {
    const incident = await tx.incident.findUnique({
      where: {
        id: incidentId,
      },
    });

    if (!incident) {
      throw new AppError('Incident not found', 'INCIDENT_NOT_FOUND');
    }

    if (incident.status !== 'IN_PROGRESS') {
      throw new AppError(
        'Only incidents that are in progress can be resolved',
        'INVALID_INCIDENT_STATUS',
      );
    }

    const existingResolution = await tx.incidentResolution.findUnique({
      where: {
        incidentId,
      },
    });

    if (existingResolution) {
      throw new AppError(
        'A resolution already exists for this incident',
        'INCIDENT_ALREADY_RESOLVED',
      );
    }

    const now = new Date();

    const resolution = await tx.incidentResolution.create({
      data: {
        incidentId,
        rootCause: data.rootCause,
        resolution: data.resolution,
        correctiveAction: data.correctiveAction,
        resolvedByUserId: userId,
        notes: data.notes,
      },
    });

    const resolvedIncident = await tx.incident.update({
      where: {
        id: incidentId,
      },
      data: {
        status: 'RESOLVED',
        resolvedAt: now,
      },
    });

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.INCIDENT_RESOLVED,
      entityType: AUDIT_ENTITY_TYPES.INCIDENT,
      entityId: incident.id,
      description: `Incident ${incident.referenceNumber} resolved`,
      oldValue: {
        status: incident.status,
        resolvedAt: incident.resolvedAt
          ? incident.resolvedAt.toISOString()
          : null,
      },
      newValue: {
        status: resolvedIncident.status,
        resolvedAt: resolvedIncident.resolvedAt
          ? resolvedIncident.resolvedAt.toISOString()
          : null,
        resolutionId: resolution.id,
      },
    });

    return resolution;
  });
}
