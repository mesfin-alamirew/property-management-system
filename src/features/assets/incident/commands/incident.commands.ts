import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findIncidentById,
  findAssetById,
  findUserById,
  createIncidentRecord,
  updateIncidentRecord,
  reportIncidentRecord,
  assignIncidentRecord,
  startIncidentRecord,
  resolveIncidentRecord,
  closeIncidentRecord,
  cancelIncidentRecord,
} from '../repositories/incident.repository';

import type { IncidentFormData } from '../schemas/incident.schema';

import { generateNextIncidentReferenceNumber } from '../services/incident-reference-number.service';

import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';

import { recordAuditEvent } from '@/lib/audit/audit.service';

export async function createIncident(userId: string, data: IncidentFormData) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  return prisma.$transaction(async (tx) => {
    const referenceNumber = await generateNextIncidentReferenceNumber(tx);

    const incident = await createIncidentRecord(
      tx,
      referenceNumber,
      userId,
      data,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.INCIDENT_CREATED,
      entityType: AUDIT_ENTITY_TYPES.INCIDENT,
      entityId: incident.id,
      description: `Incident ${incident.referenceNumber} created`,
      newValue: {
        referenceNumber: incident.referenceNumber,
        assetId: incident.assetId,
        type: incident.type,
        severity: incident.severity,
        status: incident.status,
        title: incident.title,
        incidentDate: incident.incidentDate.toISOString(),
      },
    });

    return incident;
  });
}
export async function updateIncident(
  userId: string,
  id: string,
  data: IncidentFormData,
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const incident = await findIncidentById(id);

  if (!incident) {
    throw new AppError('Incident not found', 'INCIDENT_NOT_FOUND');
  }

  if (incident.status !== 'DRAFT') {
    throw new AppError(
      'Only draft incident records can be edited',
      'INCIDENT_NOT_EDITABLE',
    );
  }

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  return prisma.$transaction(async (tx) => {
    const updatedIncident = await updateIncidentRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.INCIDENT_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.INCIDENT,
      entityId: incident.id,
      description: `Incident ${incident.referenceNumber} updated`,

      oldValue: {
        assetId: incident.assetId,
        type: incident.type,
        severity: incident.severity,
        title: incident.title,
        description: incident.description,
        incidentDate: incident.incidentDate.toISOString(),
        notes: incident.notes,
      },

      newValue: {
        assetId: updatedIncident.assetId,
        type: updatedIncident.type,
        severity: updatedIncident.severity,
        title: updatedIncident.title,
        description: updatedIncident.description,
        incidentDate: updatedIncident.incidentDate.toISOString(),
        notes: updatedIncident.notes,
      },
    });

    return updatedIncident;
  });
}
export async function reportIncident(userId: string, incidentId: string) {
  const incident = await findIncidentById(incidentId);

  if (!incident) {
    throw new AppError('Incident not found', 'INCIDENT_NOT_FOUND');
  }

  if (incident.status !== 'DRAFT') {
    throw new AppError(
      'Only draft incident records can be reported',
      'INCIDENT_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('Reporting user not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('Reporting user is inactive', 'USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const reportedAt = new Date();

    const reportedIncident = await reportIncidentRecord(
      tx,
      incidentId,
      reportedAt,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.INCIDENT_REPORTED,
      entityType: AUDIT_ENTITY_TYPES.INCIDENT,
      entityId: incident.id,
      description: `Incident ${incident.referenceNumber} reported`,

      oldValue: {
        status: incident.status,
      },

      newValue: {
        status: reportedIncident.status,
        reportedAt: reportedIncident.reportedAt
          ? reportedIncident.reportedAt.toISOString()
          : null,
      },
    });

    return reportedIncident;
  });
}
export async function assignIncident(
  focalPersonUserId: string,
  incidentId: string,
  assignedToUserId: string,
) {
  const incident = await findIncidentById(incidentId);

  if (!incident) {
    throw new AppError('Incident not found', 'INCIDENT_NOT_FOUND');
  }

  if (incident.status !== 'REPORTED') {
    throw new AppError(
      'Only reported incident records can be assigned',
      'INCIDENT_INVALID_STATUS',
    );
  }

  const focalPerson = await findUserById(focalPersonUserId);

  if (!focalPerson) {
    throw new AppError('Focal person not found', 'USER_NOT_FOUND');
  }

  if (!focalPerson.isActive) {
    throw new AppError('Focal person is inactive', 'USER_INACTIVE');
  }

  const assignedUser = await findUserById(assignedToUserId);

  if (!assignedUser) {
    throw new AppError('Assigned user not found', 'ASSIGNED_USER_NOT_FOUND');
  }

  if (!assignedUser.isActive) {
    throw new AppError('Assigned user is inactive', 'ASSIGNED_USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const assignedAt = new Date();

    const assignedIncident = await assignIncidentRecord(
      tx,
      incidentId,
      assignedToUserId,
      assignedAt,
    );

    await recordAuditEvent(tx, {
      userId: focalPersonUserId,
      action: AUDIT_ACTIONS.INCIDENT_ASSIGNED,
      entityType: AUDIT_ENTITY_TYPES.INCIDENT,
      entityId: incident.id,
      description: `Incident ${incident.referenceNumber} assigned to a responsible officer.`,

      oldValue: {
        status: incident.status,
        assignedToUserId: incident.assignedToUserId,
        assignedAt: incident.assignedAt
          ? incident.assignedAt.toISOString()
          : null,
      },

      newValue: {
        status: assignedIncident.status,
        assignedToUserId: assignedIncident.assignedToUserId,
        assignedAt: assignedAt.toISOString(),
      },
    });

    return assignedIncident;
  });
}
export async function startIncident(userId: string, incidentId: string) {
  const incident = await findIncidentById(incidentId);

  if (!incident) {
    throw new AppError('Incident not found', 'INCIDENT_NOT_FOUND');
  }

  if (incident.status !== 'ASSIGNED') {
    throw new AppError(
      'Only assigned incident records can be started',
      'INCIDENT_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const startedAt = new Date();

    const startedIncident = await startIncidentRecord(
      tx,
      incidentId,
      startedAt,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.INCIDENT_STARTED,
      entityType: AUDIT_ENTITY_TYPES.INCIDENT,
      entityId: incident.id,
      description: `Incident ${incident.referenceNumber} was started.`,

      oldValue: {
        status: incident.status,
        startedAt: incident.startedAt ? incident.startedAt.toISOString() : null,
      },

      newValue: {
        status: startedIncident.status,
        startedAt: startedIncident.startedAt
          ? startedIncident.startedAt.toISOString()
          : null,
      },
    });

    return startedIncident;
  });
}
export async function resolveIncident(userId: string, incidentId: string) {
  const incident = await findIncidentById(incidentId);

  if (!incident) {
    throw new AppError('Incident not found', 'INCIDENT_NOT_FOUND');
  }

  if (incident.status !== 'IN_PROGRESS') {
    throw new AppError(
      'Only in-progress incident records can be resolved',
      'INCIDENT_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const resolvedAt = new Date();

    const resolvedIncident = await resolveIncidentRecord(
      tx,
      incidentId,
      resolvedAt,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.INCIDENT_RESOLVED,
      entityType: AUDIT_ENTITY_TYPES.INCIDENT,
      entityId: incident.id,
      description: `Incident ${incident.referenceNumber} was resolved.`,

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
      },
    });

    return resolvedIncident;
  });
}
export async function closeIncident(userId: string, incidentId: string) {
  const incident = await findIncidentById(incidentId);

  if (!incident) {
    throw new AppError('Incident not found', 'INCIDENT_NOT_FOUND');
  }

  if (incident.status !== 'RESOLVED') {
    throw new AppError(
      'Only resolved incident records can be closed',
      'INCIDENT_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const closedAt = new Date();

    const closedIncident = await closeIncidentRecord(tx, incidentId, closedAt);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.INCIDENT_CLOSED,
      entityType: AUDIT_ENTITY_TYPES.INCIDENT,
      entityId: incident.id,
      description: `Incident ${incident.referenceNumber} was closed.`,

      oldValue: {
        status: incident.status,
        closedAt: incident.closedAt ? incident.closedAt.toISOString() : null,
      },

      newValue: {
        status: closedIncident.status,
        closedAt: closedIncident.closedAt
          ? closedIncident.closedAt.toISOString()
          : null,
      },
    });

    return closedIncident;
  });
}
export async function cancelIncident(userId: string, incidentId: string) {
  const incident = await findIncidentById(incidentId);

  if (!incident) {
    throw new AppError('Incident not found', 'INCIDENT_NOT_FOUND');
  }

  if (
    incident.status !== 'DRAFT' &&
    incident.status !== 'REPORTED' &&
    incident.status !== 'ASSIGNED'
  ) {
    throw new AppError(
      'Only draft, reported, or assigned incident records can be cancelled',
      'INCIDENT_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const cancelledIncident = await cancelIncidentRecord(tx, incidentId);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.INCIDENT_CANCELLED,
      entityType: AUDIT_ENTITY_TYPES.INCIDENT,
      entityId: incident.id,
      description: `Incident ${incident.referenceNumber} was cancelled.`,

      oldValue: {
        status: incident.status,
      },

      newValue: {
        status: cancelledIncident.status,
      },
    });

    return cancelledIncident;
  });
}
