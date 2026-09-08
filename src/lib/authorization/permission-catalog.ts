export type PermissionDefinition = {
  code: string;
  resource: string;
  action: string;
  description: string;
};

export const PERMISSION_CATALOG: PermissionDefinition[] = [
  // ============================================================
  // Administration
  // ============================================================

  {
    code: 'COUNTRY:CREATE',
    resource: 'COUNTRY',
    action: 'CREATE',
    description: 'Create a country',
  },
  {
    code: 'COUNTRY:READ',
    resource: 'COUNTRY',
    action: 'READ',
    description: 'View country information',
  },
  {
    code: 'COUNTRY:UPDATE',
    resource: 'COUNTRY',
    action: 'UPDATE',
    description: 'Update country information',
  },
  {
    code: 'COUNTRY:DEACTIVATE',
    resource: 'COUNTRY',
    action: 'DEACTIVATE',
    description: 'Deactivate a country',
  },

  {
    code: 'ORGANIZATION_UNIT:CREATE',
    resource: 'ORGANIZATION_UNIT',
    action: 'CREATE',
    description: 'Create an organization unit',
  },
  {
    code: 'ORGANIZATION_UNIT:READ',
    resource: 'ORGANIZATION_UNIT',
    action: 'READ',
    description: 'View organization unit information',
  },
  {
    code: 'ORGANIZATION_UNIT:UPDATE',
    resource: 'ORGANIZATION_UNIT',
    action: 'UPDATE',
    description: 'Update organization unit information',
  },
  {
    code: 'ORGANIZATION_UNIT:DEACTIVATE',
    resource: 'ORGANIZATION_UNIT',
    action: 'DEACTIVATE',
    description: 'Deactivate an organization unit',
  },

  {
    code: 'REGION:CREATE',
    resource: 'REGION',
    action: 'CREATE',
    description: 'Create a region',
  },
  {
    code: 'REGION:READ',
    resource: 'REGION',
    action: 'READ',
    description: 'View region information',
  },
  {
    code: 'REGION:UPDATE',
    resource: 'REGION',
    action: 'UPDATE',
    description: 'Update region information',
  },
  {
    code: 'REGION:DEACTIVATE',
    resource: 'REGION',
    action: 'DEACTIVATE',
    description: 'Deactivate a region',
  },

  {
    code: 'ZONE:CREATE',
    resource: 'ZONE',
    action: 'CREATE',
    description: 'Create a zone',
  },
  {
    code: 'ZONE:READ',
    resource: 'ZONE',
    action: 'READ',
    description: 'View zone information',
  },
  {
    code: 'ZONE:UPDATE',
    resource: 'ZONE',
    action: 'UPDATE',
    description: 'Update zone information',
  },
  {
    code: 'ZONE:DEACTIVATE',
    resource: 'ZONE',
    action: 'DEACTIVATE',
    description: 'Deactivate a zone',
  },

  {
    code: 'WOREDA:CREATE',
    resource: 'WOREDA',
    action: 'CREATE',
    description: 'Create a woreda',
  },
  {
    code: 'WOREDA:READ',
    resource: 'WOREDA',
    action: 'READ',
    description: 'View woreda information',
  },
  {
    code: 'WOREDA:UPDATE',
    resource: 'WOREDA',
    action: 'UPDATE',
    description: 'Update woreda information',
  },
  {
    code: 'WOREDA:DEACTIVATE',
    resource: 'WOREDA',
    action: 'DEACTIVATE',
    description: 'Deactivate a woreda',
  },

  // ============================================================
  // Building
  // ============================================================

  {
    code: 'BUILDING:CREATE',
    resource: 'BUILDING',
    action: 'CREATE',
    description: 'Create a building',
  },
  {
    code: 'BUILDING:READ',
    resource: 'BUILDING',
    action: 'READ',
    description: 'View building information',
  },
  {
    code: 'BUILDING:UPDATE',
    resource: 'BUILDING',
    action: 'UPDATE',
    description: 'Update building information',
  },
  {
    code: 'BUILDING:DEACTIVATE',
    resource: 'BUILDING',
    action: 'DEACTIVATE',
    description: 'Deactivate a building',
  },

  // ============================================================
  // Ownership
  // ============================================================

  {
    code: 'OWNERSHIP:CREATE',
    resource: 'OWNERSHIP',
    action: 'CREATE',
    description: 'Create an ownership record',
  },
  {
    code: 'OWNERSHIP:READ',
    resource: 'OWNERSHIP',
    action: 'READ',
    description: 'View ownership information',
  },
  {
    code: 'OWNERSHIP:UPDATE',
    resource: 'OWNERSHIP',
    action: 'UPDATE',
    description: 'Update an ownership record',
  },
  {
    code: 'OWNERSHIP:DEACTIVATE',
    resource: 'OWNERSHIP',
    action: 'DEACTIVATE',
    description: 'Deactivate an ownership record',
  },

  {
    code: 'OWNERSHIP_TYPE:CREATE',
    resource: 'OWNERSHIP_TYPE',
    action: 'CREATE',
    description: 'Create an ownership type',
  },
  {
    code: 'OWNERSHIP_TYPE:READ',
    resource: 'OWNERSHIP_TYPE',
    action: 'READ',
    description: 'View ownership type information',
  },
  {
    code: 'OWNERSHIP_TYPE:UPDATE',
    resource: 'OWNERSHIP_TYPE',
    action: 'UPDATE',
    description: 'Update an ownership type',
  },
  {
    code: 'OWNERSHIP_TYPE:DEACTIVATE',
    resource: 'OWNERSHIP_TYPE',
    action: 'DEACTIVATE',
    description: 'Deactivate an ownership type',
  },

  // ============================================================
  // Property
  // ============================================================

  {
    code: 'PROPERTY:CREATE',
    resource: 'PROPERTY',
    action: 'CREATE',
    description: 'Create a property',
  },
  {
    code: 'PROPERTY:READ',
    resource: 'PROPERTY',
    action: 'READ',
    description: 'View property information',
  },
  {
    code: 'PROPERTY:UPDATE',
    resource: 'PROPERTY',
    action: 'UPDATE',
    description: 'Update property information',
  },
  {
    code: 'PROPERTY:DEACTIVATE',
    resource: 'PROPERTY',
    action: 'DEACTIVATE',
    description: 'Deactivate a property',
  },

  {
    code: 'PROPERTY_CATEGORY:CREATE',
    resource: 'PROPERTY_CATEGORY',
    action: 'CREATE',
    description: 'Create a property category',
  },
  {
    code: 'PROPERTY_CATEGORY:READ',
    resource: 'PROPERTY_CATEGORY',
    action: 'READ',
    description: 'View property category information',
  },
  {
    code: 'PROPERTY_CATEGORY:UPDATE',
    resource: 'PROPERTY_CATEGORY',
    action: 'UPDATE',
    description: 'Update a property category',
  },
  {
    code: 'PROPERTY_CATEGORY:DEACTIVATE',
    resource: 'PROPERTY_CATEGORY',
    action: 'DEACTIVATE',
    description: 'Deactivate a property category',
  },

  {
    code: 'PROPERTY_STATUS:CREATE',
    resource: 'PROPERTY_STATUS',
    action: 'CREATE',
    description: 'Create a property status',
  },
  {
    code: 'PROPERTY_STATUS:READ',
    resource: 'PROPERTY_STATUS',
    action: 'READ',
    description: 'View property status information',
  },
  {
    code: 'PROPERTY_STATUS:UPDATE',
    resource: 'PROPERTY_STATUS',
    action: 'UPDATE',
    description: 'Update a property status',
  },
  {
    code: 'PROPERTY_STATUS:DEACTIVATE',
    resource: 'PROPERTY_STATUS',
    action: 'DEACTIVATE',
    description: 'Deactivate a property status',
  },

  {
    code: 'PROPERTY_TENURE:CREATE',
    resource: 'PROPERTY_TENURE',
    action: 'CREATE',
    description: 'Create a property tenure',
  },
  {
    code: 'PROPERTY_TENURE:READ',
    resource: 'PROPERTY_TENURE',
    action: 'READ',
    description: 'View property tenure information',
  },
  {
    code: 'PROPERTY_TENURE:UPDATE',
    resource: 'PROPERTY_TENURE',
    action: 'UPDATE',
    description: 'Update a property tenure',
  },
  {
    code: 'PROPERTY_TENURE:DEACTIVATE',
    resource: 'PROPERTY_TENURE',
    action: 'DEACTIVATE',
    description: 'Deactivate a property tenure',
  },

  {
    code: 'PROPERTY_TYPE:CREATE',
    resource: 'PROPERTY_TYPE',
    action: 'CREATE',
    description: 'Create a property type',
  },
  {
    code: 'PROPERTY_TYPE:READ',
    resource: 'PROPERTY_TYPE',
    action: 'READ',
    description: 'View property type information',
  },
  {
    code: 'PROPERTY_TYPE:UPDATE',
    resource: 'PROPERTY_TYPE',
    action: 'UPDATE',
    description: 'Update a property type',
  },
  {
    code: 'PROPERTY_TYPE:DEACTIVATE',
    resource: 'PROPERTY_TYPE',
    action: 'DEACTIVATE',
    description: 'Deactivate a property type',
  },

  // ============================================================
  // Asset Master Data
  // ============================================================

  {
    code: 'ASSET_TYPE:CREATE',
    resource: 'ASSET_TYPE',
    action: 'CREATE',
    description: 'Create an asset type',
  },
  {
    code: 'ASSET_TYPE:READ',
    resource: 'ASSET_TYPE',
    action: 'READ',
    description: 'View asset type information',
  },
  {
    code: 'ASSET_TYPE:UPDATE',
    resource: 'ASSET_TYPE',
    action: 'UPDATE',
    description: 'Update an asset type',
  },
  {
    code: 'ASSET_TYPE:DEACTIVATE',
    resource: 'ASSET_TYPE',
    action: 'DEACTIVATE',
    description: 'Deactivate an asset type',
  },

  {
    code: 'ASSET_CATEGORY:CREATE',
    resource: 'ASSET_CATEGORY',
    action: 'CREATE',
    description: 'Create an asset category',
  },
  {
    code: 'ASSET_CATEGORY:READ',
    resource: 'ASSET_CATEGORY',
    action: 'READ',
    description: 'View asset category information',
  },
  {
    code: 'ASSET_CATEGORY:UPDATE',
    resource: 'ASSET_CATEGORY',
    action: 'UPDATE',
    description: 'Update an asset category',
  },
  {
    code: 'ASSET_CATEGORY:DEACTIVATE',
    resource: 'ASSET_CATEGORY',
    action: 'DEACTIVATE',
    description: 'Deactivate an asset category',
  },

  {
    code: 'ASSET_STATUS:CREATE',
    resource: 'ASSET_STATUS',
    action: 'CREATE',
    description: 'Create an asset status',
  },
  {
    code: 'ASSET_STATUS:READ',
    resource: 'ASSET_STATUS',
    action: 'READ',
    description: 'View asset status information',
  },
  {
    code: 'ASSET_STATUS:UPDATE',
    resource: 'ASSET_STATUS',
    action: 'UPDATE',
    description: 'Update an asset status',
  },
  {
    code: 'ASSET_STATUS:DEACTIVATE',
    resource: 'ASSET_STATUS',
    action: 'DEACTIVATE',
    description: 'Deactivate an asset status',
  },

  {
    code: 'ASSET_CONDITION:CREATE',
    resource: 'ASSET_CONDITION',
    action: 'CREATE',
    description: 'Create an asset condition',
  },
  {
    code: 'ASSET_CONDITION:READ',
    resource: 'ASSET_CONDITION',
    action: 'READ',
    description: 'View asset condition information',
  },
  {
    code: 'ASSET_CONDITION:UPDATE',
    resource: 'ASSET_CONDITION',
    action: 'UPDATE',
    description: 'Update an asset condition',
  },
  {
    code: 'ASSET_CONDITION:DEACTIVATE',
    resource: 'ASSET_CONDITION',
    action: 'DEACTIVATE',
    description: 'Deactivate an asset condition',
  },

  {
    code: 'ASSET_LOCATION:CREATE',
    resource: 'ASSET_LOCATION',
    action: 'CREATE',
    description: 'Create an asset location',
  },
  {
    code: 'ASSET_LOCATION:READ',
    resource: 'ASSET_LOCATION',
    action: 'READ',
    description: 'View asset location information',
  },
  {
    code: 'ASSET_LOCATION:UPDATE',
    resource: 'ASSET_LOCATION',
    action: 'UPDATE',
    description: 'Update an asset location',
  },
  {
    code: 'ASSET_LOCATION:DEACTIVATE',
    resource: 'ASSET_LOCATION',
    action: 'DEACTIVATE',
    description: 'Deactivate an asset location',
  },

  // ============================================================
  // Asset
  // ============================================================

  {
    code: 'ASSET:CREATE',
    resource: 'ASSET',
    action: 'CREATE',
    description: 'Create an asset',
  },
  {
    code: 'ASSET:READ',
    resource: 'ASSET',
    action: 'READ',
    description: 'View asset information',
  },
  {
    code: 'ASSET:UPDATE',
    resource: 'ASSET',
    action: 'UPDATE',
    description: 'Update asset information',
  },

  // ============================================================
  // Employee
  // ============================================================

  {
    code: 'EMPLOYEE:CREATE',
    resource: 'EMPLOYEE',
    action: 'CREATE',
    description: 'Create an employee',
  },
  {
    code: 'EMPLOYEE:READ',
    resource: 'EMPLOYEE',
    action: 'READ',
    description: 'View employee information',
  },
  {
    code: 'EMPLOYEE:UPDATE',
    resource: 'EMPLOYEE',
    action: 'UPDATE',
    description: 'Update employee information',
  },
  {
    code: 'EMPLOYEE:DEACTIVATE',
    resource: 'EMPLOYEE',
    action: 'DEACTIVATE',
    description: 'Deactivate an employee',
  },

  // ============================================================
  // Acquisition
  // ============================================================

  {
    code: 'ACQUISITION:CREATE',
    resource: 'ACQUISITION',
    action: 'CREATE',
    description: 'Create an acquisition',
  },
  {
    code: 'ACQUISITION:READ',
    resource: 'ACQUISITION',
    action: 'READ',
    description: 'View acquisition information',
  },
  {
    code: 'ACQUISITION:UPDATE',
    resource: 'ACQUISITION',
    action: 'UPDATE',
    description: 'Update an acquisition',
  },

  {
    code: 'ACQUISITION_ITEM:CREATE',
    resource: 'ACQUISITION_ITEM',
    action: 'CREATE',
    description: 'Create an acquisition item',
  },
  {
    code: 'ACQUISITION_ITEM:READ',
    resource: 'ACQUISITION_ITEM',
    action: 'READ',
    description: 'View acquisition item information',
  },
  {
    code: 'ACQUISITION_ITEM:UPDATE',
    resource: 'ACQUISITION_ITEM',
    action: 'UPDATE',
    description: 'Update an acquisition item',
  },

  {
    code: 'ACQUISITION_METHOD:CREATE',
    resource: 'ACQUISITION_METHOD',
    action: 'CREATE',
    description: 'Create an acquisition method',
  },
  {
    code: 'ACQUISITION_METHOD:READ',
    resource: 'ACQUISITION_METHOD',
    action: 'READ',
    description: 'View acquisition method information',
  },
  {
    code: 'ACQUISITION_METHOD:UPDATE',
    resource: 'ACQUISITION_METHOD',
    action: 'UPDATE',
    description: 'Update an acquisition method',
  },
  {
    code: 'ACQUISITION_METHOD:DEACTIVATE',
    resource: 'ACQUISITION_METHOD',
    action: 'DEACTIVATE',
    description: 'Deactivate an acquisition method',
  },

  // ============================================================
  // Asset Accountability
  // ============================================================

  {
    code: 'ASSET_ASSIGNMENT:CREATE',
    resource: 'ASSET_ASSIGNMENT',
    action: 'CREATE',
    description: 'Assign an asset',
  },
  {
    code: 'ASSET_ASSIGNMENT:READ',
    resource: 'ASSET_ASSIGNMENT',
    action: 'READ',
    description: 'View asset assignment information',
  },
  {
    code: 'ASSET_ASSIGNMENT:RETURN',
    resource: 'ASSET_ASSIGNMENT',
    action: 'RETURN',
    description: 'Return an assigned asset',
  },

  {
    code: 'ASSET_MOVEMENT:READ',
    resource: 'ASSET_MOVEMENT',
    action: 'READ',
    description: 'View asset movement information',
  },
  {
    code: 'ASSET_MOVEMENT:MOVE',
    resource: 'ASSET_MOVEMENT',
    action: 'MOVE',
    description: 'Move an asset to another location',
  },

  // ============================================================
  // Maintenance
  // ============================================================

  {
    code: 'MAINTENANCE:CREATE',
    resource: 'MAINTENANCE',
    action: 'CREATE',
    description: 'Create a maintenance record',
  },
  {
    code: 'MAINTENANCE:READ',
    resource: 'MAINTENANCE',
    action: 'READ',
    description: 'View maintenance information',
  },
  {
    code: 'MAINTENANCE:UPDATE',
    resource: 'MAINTENANCE',
    action: 'UPDATE',
    description: 'Update maintenance information',
  },
  {
    code: 'MAINTENANCE:REQUEST',
    resource: 'MAINTENANCE',
    action: 'REQUEST',
    description: 'Request maintenance',
  },
  {
    code: 'MAINTENANCE:ASSIGN',
    resource: 'MAINTENANCE',
    action: 'ASSIGN',
    description: 'Assign maintenance work',
  },
  {
    code: 'MAINTENANCE:APPROVE',
    resource: 'MAINTENANCE',
    action: 'APPROVE',
    description: 'Approve maintenance work',
  },
  {
    code: 'MAINTENANCE:START',
    resource: 'MAINTENANCE',
    action: 'START',
    description: 'Start maintenance work',
  },
  {
    code: 'MAINTENANCE:COMPLETE',
    resource: 'MAINTENANCE',
    action: 'COMPLETE',
    description: 'Complete maintenance work',
  },

  {
    code: 'MAINTENANCE_SERVICE:CREATE',
    resource: 'MAINTENANCE_SERVICE',
    action: 'CREATE',
    description: 'Create a maintenance service',
  },
  {
    code: 'MAINTENANCE_SERVICE:READ',
    resource: 'MAINTENANCE_SERVICE',
    action: 'READ',
    description: 'View maintenance service information',
  },
  {
    code: 'MAINTENANCE_SERVICE:UPDATE',
    resource: 'MAINTENANCE_SERVICE',
    action: 'UPDATE',
    description: 'Update a maintenance service',
  },
  {
    code: 'MAINTENANCE_SERVICE:DELETE',
    resource: 'MAINTENANCE_SERVICE',
    action: 'DELETE',
    description: 'Delete a maintenance service',
  },

  // ============================================================
  // Incident
  // ============================================================

  {
    code: 'INCIDENT:CREATE',
    resource: 'INCIDENT',
    action: 'CREATE',
    description: 'Create an incident',
  },
  {
    code: 'INCIDENT:READ',
    resource: 'INCIDENT',
    action: 'READ',
    description: 'View incident information',
  },
  {
    code: 'INCIDENT:UPDATE',
    resource: 'INCIDENT',
    action: 'UPDATE',
    description: 'Update incident information',
  },
  {
    code: 'INCIDENT:REPORT',
    resource: 'INCIDENT',
    action: 'REPORT',
    description: 'Report an incident',
  },
  {
    code: 'INCIDENT:ASSIGN',
    resource: 'INCIDENT',
    action: 'ASSIGN',
    description: 'Assign an incident',
  },
  {
    code: 'INCIDENT:START',
    resource: 'INCIDENT',
    action: 'START',
    description: 'Start incident handling',
  },
  {
    code: 'INCIDENT:RESOLVE',
    resource: 'INCIDENT',
    action: 'RESOLVE',
    description: 'Resolve an incident',
  },
  {
    code: 'INCIDENT:CLOSE',
    resource: 'INCIDENT',
    action: 'CLOSE',
    description: 'Close an incident',
  },
  {
    code: 'INCIDENT:CANCEL',
    resource: 'INCIDENT',
    action: 'CANCEL',
    description: 'Cancel an incident',
  },

  // ============================================================
  // Physical Verification
  // ============================================================

  {
    code: 'PHYSICAL_VERIFICATION:CREATE',
    resource: 'PHYSICAL_VERIFICATION',
    action: 'CREATE',
    description: 'Create a physical verification',
  },
  {
    code: 'PHYSICAL_VERIFICATION:READ',
    resource: 'PHYSICAL_VERIFICATION',
    action: 'READ',
    description: 'View physical verification information',
  },
  {
    code: 'PHYSICAL_VERIFICATION:GENERATE',
    resource: 'PHYSICAL_VERIFICATION',
    action: 'GENERATE',
    description: 'Generate physical verification items',
  },
  {
    code: 'PHYSICAL_VERIFICATION:VERIFY',
    resource: 'PHYSICAL_VERIFICATION',
    action: 'VERIFY',
    description: 'Verify an asset during physical verification',
  },
  {
    code: 'PHYSICAL_VERIFICATION:COMPLETE',
    resource: 'PHYSICAL_VERIFICATION',
    action: 'COMPLETE',
    description: 'Complete a physical verification',
  },

  {
    code: 'UNREGISTERED_ASSET_OBSERVATION:CREATE',
    resource: 'UNREGISTERED_ASSET_OBSERVATION',
    action: 'CREATE',
    description: 'Record an unregistered asset observation',
  },
  {
    code: 'UNREGISTERED_ASSET_OBSERVATION:READ',
    resource: 'UNREGISTERED_ASSET_OBSERVATION',
    action: 'READ',
    description: 'View unregistered asset observations',
  },

  // ============================================================
  // Retirement
  // ============================================================

  {
    code: 'RETIREMENT:CREATE',
    resource: 'RETIREMENT',
    action: 'CREATE',
    description: 'Create a retirement record',
  },
  {
    code: 'RETIREMENT:READ',
    resource: 'RETIREMENT',
    action: 'READ',
    description: 'View retirement information',
  },
  {
    code: 'RETIREMENT:REQUEST',
    resource: 'RETIREMENT',
    action: 'REQUEST',
    description: 'Request asset retirement',
  },
  {
    code: 'RETIREMENT:APPROVE',
    resource: 'RETIREMENT',
    action: 'APPROVE',
    description: 'Approve asset retirement',
  },
  {
    code: 'RETIREMENT:CANCEL',
    resource: 'RETIREMENT',
    action: 'CANCEL',
    description: 'Cancel an asset retirement',
  },

  // ============================================================
  // Disposal
  // ============================================================

  {
    code: 'DISPOSAL:CREATE',
    resource: 'DISPOSAL',
    action: 'CREATE',
    description: 'Create a disposal record',
  },
  {
    code: 'DISPOSAL:READ',
    resource: 'DISPOSAL',
    action: 'READ',
    description: 'View disposal information',
  },
  {
    code: 'DISPOSAL:REQUEST',
    resource: 'DISPOSAL',
    action: 'REQUEST',
    description: 'Request asset disposal',
  },
  {
    code: 'DISPOSAL:APPROVE',
    resource: 'DISPOSAL',
    action: 'APPROVE',
    description: 'Approve asset disposal',
  },
  {
    code: 'DISPOSAL:CANCEL',
    resource: 'DISPOSAL',
    action: 'CANCEL',
    description: 'Cancel an asset disposal',
  },

  {
    code: 'DISPOSAL_ITEM:CREATE',
    resource: 'DISPOSAL_ITEM',
    action: 'CREATE',
    description: 'Add an asset to a disposal',
  },
  {
    code: 'DISPOSAL_ITEM:READ',
    resource: 'DISPOSAL_ITEM',
    action: 'READ',
    description: 'View disposal item information',
  },
  {
    code: 'DISPOSAL_ITEM:UPDATE',
    resource: 'DISPOSAL_ITEM',
    action: 'UPDATE',
    description: 'Update a disposal item',
  },

  // ============================================================
  // Reporting
  // ============================================================

  {
    code: 'REPORT_ASSET:READ',
    resource: 'REPORT_ASSET',
    action: 'READ',
    description: 'View asset reports',
  },
  {
    code: 'REPORT_ACQUISITION:READ',
    resource: 'REPORT_ACQUISITION',
    action: 'READ',
    description: 'View acquisition reports',
  },
  {
    code: 'REPORT_ASSIGNMENT:READ',
    resource: 'REPORT_ASSIGNMENT',
    action: 'READ',
    description: 'View asset assignment reports',
  },
  {
    code: 'REPORT_VERIFICATION:READ',
    resource: 'REPORT_VERIFICATION',
    action: 'READ',
    description: 'View physical verification reports',
  },
  {
    code: 'REPORT_MAINTENANCE:READ',
    resource: 'REPORT_MAINTENANCE',
    action: 'READ',
    description: 'View maintenance reports',
  },
  {
    code: 'REPORT_INCIDENT:READ',
    resource: 'REPORT_INCIDENT',
    action: 'READ',
    description: 'View incident reports',
  },
  {
    code: 'REPORT_RETIREMENT:READ',
    resource: 'REPORT_RETIREMENT',
    action: 'READ',
    description: 'View retirement reports',
  },
  {
    code: 'REPORT_MOVEMENT:READ',
    resource: 'REPORT_MOVEMENT',
    action: 'READ',
    description: 'View asset movement reports',
  },
  {
    code: 'REPORT_DISPOSAL:READ',
    resource: 'REPORT_DISPOSAL',
    action: 'READ',
    description: 'View disposal reports',
  },
  {
    code: 'REPORT_AUDIT:READ',
    resource: 'REPORT_AUDIT',
    action: 'READ',
    description: 'View audit reports',
  },
  {
    code: 'REPORT_ACCOUNTABILITY:READ',
    resource: 'REPORT_ACCOUNTABILITY',
    action: 'READ',
    description: 'View asset accountability exception reports',
  },
  {
    code: 'REPORT_DASHBOARD:READ',
    resource: 'REPORT_DASHBOARD',
    action: 'READ',
    description: 'View the management KPI dashboard',
  },
  {
    code: 'BUILDING_CONDITION:CREATE',
    resource: 'BUILDING_CONDITION',
    action: 'CREATE',
    description: 'Create building conditions',
  },
  {
    code: 'BUILDING_CONDITION:READ',
    resource: 'BUILDING_CONDITION',
    action: 'READ',
    description: 'View building conditions',
  },
  {
    code: 'BUILDING_CONDITION:UPDATE',
    resource: 'BUILDING_CONDITION',
    action: 'UPDATE',
    description: 'Update building conditions',
  },
  {
    code: 'BUILDING_CONDITION:DEACTIVATE',
    resource: 'BUILDING_CONDITION',
    action: 'DEACTIVATE',
    description: 'Deactivate building conditions',
  },

  {
    code: 'BUILDING_TYPE:CREATE',
    resource: 'BUILDING_TYPE',
    action: 'CREATE',
    description: 'Create building types',
  },
  {
    code: 'BUILDING_TYPE:READ',
    resource: 'BUILDING_TYPE',
    action: 'READ',
    description: 'View building types',
  },
  {
    code: 'BUILDING_TYPE:UPDATE',
    resource: 'BUILDING_TYPE',
    action: 'UPDATE',
    description: 'Update building types',
  },
  {
    code: 'BUILDING_TYPE:DEACTIVATE',
    resource: 'BUILDING_TYPE',
    action: 'DEACTIVATE',
    description: 'Deactivate building types',
  },

  {
    code: 'BUILDING_SPACE_TYPE:CREATE',
    resource: 'BUILDING_SPACE_TYPE',
    action: 'CREATE',
    description: 'Create building space types',
  },
  {
    code: 'BUILDING_SPACE_TYPE:READ',
    resource: 'BUILDING_SPACE_TYPE',
    action: 'READ',
    description: 'View building space types',
  },
  {
    code: 'BUILDING_SPACE_TYPE:UPDATE',
    resource: 'BUILDING_SPACE_TYPE',
    action: 'UPDATE',
    description: 'Update building space types',
  },
  {
    code: 'BUILDING_SPACE_TYPE:DEACTIVATE',
    resource: 'BUILDING_SPACE_TYPE',
    action: 'DEACTIVATE',
    description: 'Deactivate building space types',
  },

  {
    code: 'BUILDING_SPACE:CREATE',
    resource: 'BUILDING_SPACE',
    action: 'CREATE',
    description: 'Create building spaces',
  },
  {
    code: 'BUILDING_SPACE:READ',
    resource: 'BUILDING_SPACE',
    action: 'READ',
    description: 'View building spaces',
  },
  {
    code: 'BUILDING_SPACE:UPDATE',
    resource: 'BUILDING_SPACE',
    action: 'UPDATE',
    description: 'Update building spaces',
  },
  {
    code: 'BUILDING_SPACE:DEACTIVATE',
    resource: 'BUILDING_SPACE',
    action: 'DEACTIVATE',
    description: 'Deactivate building spaces',
  },
  {
    code: 'ROLE:CREATE',
    resource: 'ROLE',
    action: 'CREATE',
    description: 'Create application roles',
  },
  {
    code: 'ROLE:READ',
    resource: 'ROLE',
    action: 'READ',
    description: 'View application roles',
  },
  {
    code: 'ROLE:UPDATE',
    resource: 'ROLE',
    action: 'UPDATE',
    description: 'Update application roles',
  },
  {
    code: 'ROLE:DEACTIVATE',
    resource: 'ROLE',
    action: 'DEACTIVATE',
    description: 'Deactivate application roles',
  },
  {
    code: 'ROLE_PERMISSION:READ',
    resource: 'ROLE_PERMISSION',
    action: 'READ',
    description: 'View permissions assigned to roles',
  },
  {
    code: 'ROLE_PERMISSION:CREATE',
    resource: 'ROLE_PERMISSION',
    action: 'CREATE',
    description: 'Assign permissions to roles',
  },
  {
    code: 'ROLE_PERMISSION:DELETE',
    resource: 'ROLE_PERMISSION',
    action: 'DELETE',
    description: 'Remove permissions from roles',
  },
  {
    code: 'USER_ROLE:READ',
    resource: 'USER_ROLE',
    action: 'READ',
    description: 'View user role assignments',
  },
  {
    code: 'USER_ROLE:CREATE',
    resource: 'USER_ROLE',
    action: 'CREATE',
    description: 'Assign roles to users',
  },
  {
    code: 'USER_ROLE:DELETE',
    resource: 'USER_ROLE',
    action: 'DELETE',
    description: 'Remove roles from users',
  },
  {
    code: 'ROLE:ACTIVATE',
    resource: 'ROLE',
    action: 'ACTIVATE',
    description: 'Activate a role',
  },
];
