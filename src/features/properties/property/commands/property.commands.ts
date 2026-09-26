import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { prisma } from '@/lib/prisma';

import {
  findPropertyByCode,
  createPropertyRecord,
  updatePropertyRecord,
  deactivatePropertyRecord,
  findPropertyById,
} from '../repositories/property.repository';

import { findOrganizationUnitById } from '@/features/administration/organization-unit/repositories/organization-unit.repository';
import { findPropertyTypeById } from '@/features/properties/property-type/repositories/property-type.repository';
import { findPropertyCategoryById } from '@/features/properties/property-category/repositories/property-category.repository';
import { findPropertyTenureById } from '@/features/properties/property-tenure/repositories/property-tenure.repository';
import { findPropertyStatusById } from '@/features/properties/property-status/repositories/property-status.repository';

import type { PropertyFormData } from '../schemas/property.schema';

export async function createProperty(userId: string, data: PropertyFormData) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY:CREATE',
  });

  const existingProperty = await findPropertyByCode(data.propertyCode);

  if (existingProperty) {
    throw new AppError('Property code already exists', 'DUPLICATE_CODE');
  }

  const organizationUnit = await findOrganizationUnitById(
    data.organizationUnitId,
  );

  if (!organizationUnit) {
    throw new AppError(
      'Organization Unit not found',
      'ORGANIZATION_UNIT_NOT_FOUND',
    );
  }

  if (!organizationUnit.isActive) {
    throw new AppError(
      'Organization Unit is inactive',
      'ORGANIZATION_UNIT_INACTIVE',
    );
  }

  const propertyType = await findPropertyTypeById(data.propertyTypeId);

  if (!propertyType) {
    throw new AppError('Property Type not found', 'PROPERTY_TYPE_NOT_FOUND');
  }

  if (!propertyType.isActive) {
    throw new AppError('Property Type is inactive', 'PROPERTY_TYPE_INACTIVE');
  }

  if (data.propertyCategoryId) {
    const propertyCategory = await findPropertyCategoryById(
      data.propertyCategoryId,
    );

    if (!propertyCategory) {
      throw new AppError(
        'Property Category not found',
        'PROPERTY_CATEGORY_NOT_FOUND',
      );
    }

    if (!propertyCategory.isActive) {
      throw new AppError(
        'Property Category is inactive',
        'PROPERTY_CATEGORY_INACTIVE',
      );
    }
  }

  if (data.propertyTenureId) {
    const propertyTenure = await findPropertyTenureById(data.propertyTenureId);

    if (!propertyTenure) {
      throw new AppError(
        'Property Tenure not found',
        'PROPERTY_TENURE_NOT_FOUND',
      );
    }

    if (!propertyTenure.isActive) {
      throw new AppError(
        'Property Tenure is inactive',
        'PROPERTY_TENURE_INACTIVE',
      );
    }
  }

  if (data.propertyStatusId) {
    const propertyStatus = await findPropertyStatusById(data.propertyStatusId);

    if (!propertyStatus) {
      throw new AppError(
        'Property Status not found',
        'PROPERTY_STATUS_NOT_FOUND',
      );
    }

    if (!propertyStatus.isActive) {
      throw new AppError(
        'Property Status is inactive',
        'PROPERTY_STATUS_INACTIVE',
      );
    }
  }

  return prisma.$transaction(async (tx) => {
    const property = await createPropertyRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.PROPERTY_CREATED,
      entityType: AUDIT_ENTITY_TYPES.PROPERTY,
      entityId: property.id,
      description: `Property ${property.propertyCode} created`,
      newValue: {
        propertyCode: property.propertyCode,
        name: property.name,
        displayName: property.displayName,
        description: property.description,
        address: property.address,
        city: property.city,
        stateProvince: property.stateProvince,
        postalCode: property.postalCode,
        latitude: property.latitude?.toString() ?? null,
        longitude: property.longitude?.toString() ?? null,
        constructionDate: property.constructionDate?.toISOString() ?? null,
        grossAreaSqm: property.grossAreaSqm?.toString() ?? null,
        organizationUnitId: property.organizationUnitId,
        propertyTypeId: property.propertyTypeId,
        propertyCategoryId: property.propertyCategoryId,
        propertyTenureId: property.propertyTenureId,
        propertyStatusId: property.propertyStatusId,
        isActive: property.isActive,
      },
    });

    return property;
  });
}

export async function updateProperty(
  userId: string,
  id: string,
  data: PropertyFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY:UPDATE',
  });

  const property = await findPropertyById(id);

  if (!property) {
    throw new AppError('Property not found', 'PROPERTY_NOT_FOUND');
  }
  const existingProperty = await findPropertyByCode(data.propertyCode, id);

  if (existingProperty) {
    throw new AppError('Property code already exists', 'DUPLICATE_CODE');
  }

  const organizationUnit = await findOrganizationUnitById(
    data.organizationUnitId,
  );

  if (!organizationUnit) {
    throw new AppError(
      'Organization Unit not found',
      'ORGANIZATION_UNIT_NOT_FOUND',
    );
  }

  if (!organizationUnit.isActive) {
    throw new AppError(
      'Organization Unit is inactive',
      'ORGANIZATION_UNIT_INACTIVE',
    );
  }

  const propertyType = await findPropertyTypeById(data.propertyTypeId);

  if (!propertyType) {
    throw new AppError('Property Type not found', 'PROPERTY_TYPE_NOT_FOUND');
  }

  if (!propertyType.isActive) {
    throw new AppError('Property Type is inactive', 'PROPERTY_TYPE_INACTIVE');
  }

  if (data.propertyCategoryId) {
    const propertyCategory = await findPropertyCategoryById(
      data.propertyCategoryId,
    );

    if (!propertyCategory) {
      throw new AppError(
        'Property Category not found',
        'PROPERTY_CATEGORY_NOT_FOUND',
      );
    }

    if (!propertyCategory.isActive) {
      throw new AppError(
        'Property Category is inactive',
        'PROPERTY_CATEGORY_INACTIVE',
      );
    }
  }

  if (data.propertyTenureId) {
    const propertyTenure = await findPropertyTenureById(data.propertyTenureId);

    if (!propertyTenure) {
      throw new AppError(
        'Property Tenure not found',
        'PROPERTY_TENURE_NOT_FOUND',
      );
    }

    if (!propertyTenure.isActive) {
      throw new AppError(
        'Property Tenure is inactive',
        'PROPERTY_TENURE_INACTIVE',
      );
    }
  }

  if (data.propertyStatusId) {
    const propertyStatus = await findPropertyStatusById(data.propertyStatusId);

    if (!propertyStatus) {
      throw new AppError(
        'Property Status not found',
        'PROPERTY_STATUS_NOT_FOUND',
      );
    }

    if (!propertyStatus.isActive) {
      throw new AppError(
        'Property Status is inactive',
        'PROPERTY_STATUS_INACTIVE',
      );
    }
  }

  return prisma.$transaction(async (tx) => {
    const updatedProperty = await updatePropertyRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.PROPERTY_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.PROPERTY,
      entityId: updatedProperty.id,
      description: `Property ${updatedProperty.propertyCode} updated`,
      oldValue: {
        propertyCode: property.propertyCode,
        name: property.name,
        displayName: property.displayName,
        description: property.description,
        address: property.address,
        city: property.city,
        stateProvince: property.stateProvince,
        postalCode: property.postalCode,
        latitude: property.latitude?.toString() ?? null,
        longitude: property.longitude?.toString() ?? null,
        constructionDate: property.constructionDate?.toISOString() ?? null,
        grossAreaSqm: property.grossAreaSqm?.toString() ?? null,
        organizationUnitId: property.organizationUnitId,
        propertyTypeId: property.propertyTypeId,
        propertyCategoryId: property.propertyCategoryId,
        propertyTenureId: property.propertyTenureId,
        propertyStatusId: property.propertyStatusId,
        isActive: property.isActive,
      },
      newValue: {
        propertyCode: updatedProperty.propertyCode,
        name: updatedProperty.name,
        displayName: updatedProperty.displayName,
        description: updatedProperty.description,
        address: updatedProperty.address,
        city: updatedProperty.city,
        stateProvince: updatedProperty.stateProvince,
        postalCode: updatedProperty.postalCode,
        latitude: updatedProperty.latitude?.toString() ?? null,
        longitude: updatedProperty.longitude?.toString() ?? null,
        constructionDate:
          updatedProperty.constructionDate?.toISOString() ?? null,
        grossAreaSqm: updatedProperty.grossAreaSqm?.toString() ?? null,
        organizationUnitId: updatedProperty.organizationUnitId,
        propertyTypeId: updatedProperty.propertyTypeId,
        propertyCategoryId: updatedProperty.propertyCategoryId,
        propertyTenureId: updatedProperty.propertyTenureId,
        propertyStatusId: updatedProperty.propertyStatusId,
        isActive: updatedProperty.isActive,
      },
    });

    return updatedProperty;
  });
}

export async function deactivateProperty(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'PROPERTY:DEACTIVATE',
  });

  const property = await findPropertyById(id);

  if (!property) {
    throw new AppError('Property not found', 'PROPERTY_NOT_FOUND');
  }

  if (!property.isActive) {
    throw new AppError(
      'Property is already inactive',
      'PROPERTY_ALREADY_INACTIVE',
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedProperty = await deactivatePropertyRecord(tx, id);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.PROPERTY_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.PROPERTY,
      entityId: updatedProperty.id,
      description: `Property ${updatedProperty.propertyCode} deactivated`,
      oldValue: {
        propertyCode: property.propertyCode,
        name: property.name,
        displayName: property.displayName,
        description: property.description,
        address: property.address,
        city: property.city,
        stateProvince: property.stateProvince,
        postalCode: property.postalCode,
        latitude: property.latitude?.toString() ?? null,
        longitude: property.longitude?.toString() ?? null,
        constructionDate: property.constructionDate?.toISOString() ?? null,
        grossAreaSqm: property.grossAreaSqm?.toString() ?? null,
        organizationUnitId: property.organizationUnitId,
        propertyTypeId: property.propertyTypeId,
        propertyCategoryId: property.propertyCategoryId,
        propertyTenureId: property.propertyTenureId,
        propertyStatusId: property.propertyStatusId,
        isActive: property.isActive,
      },
      newValue: {
        propertyCode: updatedProperty.propertyCode,
        name: updatedProperty.name,
        displayName: updatedProperty.displayName,
        description: updatedProperty.description,
        address: updatedProperty.address,
        city: updatedProperty.city,
        stateProvince: updatedProperty.stateProvince,
        postalCode: updatedProperty.postalCode,
        latitude: updatedProperty.latitude?.toString() ?? null,
        longitude: updatedProperty.longitude?.toString() ?? null,
        constructionDate:
          updatedProperty.constructionDate?.toISOString() ?? null,
        grossAreaSqm: updatedProperty.grossAreaSqm?.toString() ?? null,
        organizationUnitId: updatedProperty.organizationUnitId,
        propertyTypeId: updatedProperty.propertyTypeId,
        propertyCategoryId: updatedProperty.propertyCategoryId,
        propertyTenureId: updatedProperty.propertyTenureId,
        propertyStatusId: updatedProperty.propertyStatusId,
        isActive: updatedProperty.isActive,
      },
    });

    return updatedProperty;
  });
}
