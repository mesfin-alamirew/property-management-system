import { AppError } from '@/lib/errors';

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

export async function createProperty(data: PropertyFormData) {
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

  return createPropertyRecord(data);
}
export async function updateProperty(id: string, data: PropertyFormData) {
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

  return updatePropertyRecord(id, data);
}

export async function deactivateProperty(id: string) {
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

  return deactivatePropertyRecord(id);
}
