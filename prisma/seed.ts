import { prisma } from '../src/lib/prisma';
import { AuthProvider } from '../src/generated/prisma/client';

async function main() {
  console.log('Starting PMS seed...');

  const devUser = await prisma.user.upsert({
    where: {
      username: 'dev.user',
    },
    update: {
      displayName: 'Development User',
      isActive: true,
    },
    create: {
      username: 'dev.user',
      displayName: 'Development User',
      isActive: true,
    },
  });

  await prisma.userIdentity.upsert({
    where: {
      provider_externalId: {
        provider: AuthProvider.LOCAL,
        externalId: 'dev-local-user-001',
      },
    },
    update: {
      userId: devUser.id,
    },
    create: {
      userId: devUser.id,
      provider: AuthProvider.LOCAL,
      externalId: 'dev-local-user-001',
    },
  });
  const statuses = [
    {
      code: 'ACTIVE',
      name: 'Active',
      description: 'Property is operational',
    },
    {
      code: 'VACANT',
      name: 'Vacant',
      description: 'Property is currently not occupied',
    },
    {
      code: 'UNDER_RENOVATION',
      name: 'Under Renovation',
      description: 'Property is under renovation',
    },
    {
      code: 'TEMPORARILY_CLOSED',
      name: 'Temporarily Closed',
      description: 'Property is temporarily unavailable',
    },
    {
      code: 'DISPOSED',
      name: 'Disposed',
      description: 'Property is no longer available',
    },
  ];

  for (const status of statuses) {
    await prisma.propertyStatus.upsert({
      where: {
        code: status.code,
      },
      update: status,
      create: status,
    });
  }

  const tenures = [
    {
      code: 'OWNED',
      name: 'Owned',
      description: 'Property owned by the organization',
    },
    {
      code: 'LEASED',
      name: 'Leased',
      description: 'Property leased by the organization',
    },
  ];

  for (const tenure of tenures) {
    await prisma.propertyTenure.upsert({
      where: {
        code: tenure.code,
      },
      update: tenure,
      create: tenure,
    });
  }

  const buildingTypes = [
    {
      code: 'OFFICE',
      name: 'Office',
      description:
        'Building primarily used for administrative or office activities',
    },
    {
      code: 'RESIDENTIAL',
      name: 'Residential',
      description: 'Building primarily used for residential purposes',
    },
    {
      code: 'WAREHOUSE',
      name: 'Warehouse',
      description: 'Building primarily used for storage of goods or materials',
    },
    {
      code: 'TRAINING_CENTER',
      name: 'Training Center',
      description:
        'Building primarily used for training and learning activities',
    },
    {
      code: 'SCHOOL',
      name: 'School',
      description: 'Building used for educational activities',
    },
    {
      code: 'HOSPITAL',
      name: 'Hospital',
      description: 'Building used for healthcare and medical services',
    },
    {
      code: 'RETAIL',
      name: 'Retail',
      description:
        'Building primarily used for retail or commercial activities',
    },
    {
      code: 'FACTORY',
      name: 'Factory',
      description: 'Building used for manufacturing or production activities',
    },
    {
      code: 'WORKSHOP',
      name: 'Workshop',
      description:
        'Building used for repair, fabrication, or technical activities',
    },
    {
      code: 'LABORATORY',
      name: 'Laboratory',
      description:
        'Building used for laboratory, research, or testing activities',
    },
    {
      code: 'PARKING_STRUCTURE',
      name: 'Parking Structure',
      description: 'Building or structure primarily used for vehicle parking',
    },
    {
      code: 'GUEST_HOUSE',
      name: 'Guest House',
      description:
        'Building used to accommodate organizational guests or visitors',
    },
    {
      code: 'COMMUNITY_CENTER',
      name: 'Community Center',
      description: 'Building used for community, social, or public activities',
    },
    {
      code: 'UTILITY_BUILDING',
      name: 'Utility Building',
      description: 'Building supporting utility or infrastructure services',
    },
    {
      code: 'SECURITY_BUILDING',
      name: 'Security Building',
      description:
        'Building used for security, guarding, or access-control activities',
    },
    {
      code: 'OTHER',
      name: 'Other',
      description: 'Building type not covered by the standard classifications',
    },
  ];

  for (const buildingType of buildingTypes) {
    await prisma.buildingType.upsert({
      where: {
        code: buildingType.code,
      },
      update: buildingType,
      create: buildingType,
    });
  }

  const buildingConditions = [
    {
      code: 'EXCELLENT',
      name: 'Excellent',
      description: 'Building is in excellent physical condition',
    },
    {
      code: 'GOOD',
      name: 'Good',
      description: 'Building is in good physical condition',
    },
    {
      code: 'FAIR',
      name: 'Fair',
      description: 'Building has some condition issues but remains serviceable',
    },
    {
      code: 'POOR',
      name: 'Poor',
      description: 'Building requires significant repair or improvement',
    },
    {
      code: 'CRITICAL',
      name: 'Critical',
      description: 'Building requires urgent intervention or may be unsafe',
    },
  ];

  for (const buildingCondition of buildingConditions) {
    await prisma.buildingCondition.upsert({
      where: {
        code: buildingCondition.code,
      },
      update: buildingCondition,
      create: buildingCondition,
    });
  }

  const assetStatuses = [
    {
      code: 'ACTIVE',
      name: 'Active',
      description: 'Asset is in active organizational use',
    },
    {
      code: 'IN_STORAGE',
      name: 'In Storage',
      description: 'Asset is currently held in organizational storage',
    },
    {
      code: 'IN_TRANSIT',
      name: 'In Transit',
      description: 'Asset is being transferred between locations',
    },
    {
      code: 'UNDER_MAINTENANCE',
      name: 'Under Maintenance',
      description:
        'Asset is temporarily unavailable due to maintenance or service',
    },
    {
      code: 'MISSING',
      name: 'Missing',
      description: 'Asset cannot currently be physically located',
    },
    {
      code: 'RETIRED',
      name: 'Retired',
      description: 'Asset has been retired from active organizational use',
    },
    {
      code: 'DISPOSED',
      name: 'Disposed',
      description: 'Asset has completed the disposal process',
    },
  ];

  for (const status of assetStatuses) {
    await prisma.assetStatus.upsert({
      where: {
        code: status.code,
      },
      update: status,
      create: status,
    });
  }

  const assetConditions = [
    {
      code: 'NEW',
      name: 'New',
      description:
        'Asset is new and has not previously been placed into operational use',
    },
    {
      code: 'GOOD',
      name: 'Good',
      description: 'Asset is in good working or physical condition',
    },
    {
      code: 'FAIR',
      name: 'Fair',
      description: 'Asset is serviceable but shows some wear or minor defects',
    },
    {
      code: 'POOR',
      name: 'Poor',
      description: 'Asset requires significant repair or attention',
    },
    {
      code: 'DAMAGED',
      name: 'Damaged',
      description: 'Asset has physical or functional damage',
    },
    {
      code: 'UNSERVICEABLE',
      name: 'Unserviceable',
      description: 'Asset is not currently usable for its intended purpose',
    },
  ];

  for (const condition of assetConditions) {
    await prisma.assetCondition.upsert({
      where: {
        code: condition.code,
      },
      update: condition,
      create: condition,
    });
  }

  const assetCategories = [
    {
      code: 'IT_EQUIPMENT',
      name: 'IT Equipment',
      description: 'Information technology and computing equipment',
    },
    {
      code: 'COMMUNICATIONS_EQUIPMENT',
      name: 'Communications Equipment',
      description: 'Telecommunications and communications equipment',
    },
    {
      code: 'OFFICE_EQUIPMENT',
      name: 'Office Equipment',
      description: 'Equipment used for general office operations',
    },
    {
      code: 'FURNITURE_FIXTURES',
      name: 'Furniture & Fixtures',
      description: 'Furniture, fittings, and office fixtures',
    },
    {
      code: 'VEHICLES',
      name: 'Vehicles',
      description: 'Organizational vehicles and transport assets',
    },
    {
      code: 'POWER_ELECTRICAL',
      name: 'Power & Electrical Equipment',
      description: 'Generators, electrical equipment, and related assets',
    },
    {
      code: 'TOOLS_EQUIPMENT',
      name: 'Tools & Equipment',
      description: 'Technical tools and general-purpose equipment',
    },
    {
      code: 'MEDICAL_EQUIPMENT',
      name: 'Medical Equipment',
      description: 'Medical and healthcare equipment',
    },
    {
      code: 'OTHER',
      name: 'Other',
      description: 'Assets not covered by the standard classifications',
    },
  ];
  const categoryMap = new Map<string, string>();

  for (const category of assetCategories) {
    const dbCategory = await prisma.assetCategory.upsert({
      where: {
        code: category.code,
      },
      update: category,
      create: category,
    });

    categoryMap.set(category.code, dbCategory.id);
  }

  const assetTypes = [
    {
      code: 'LAPTOP',
      name: 'Laptop',
      categoryCode: 'IT_EQUIPMENT',
      description: 'Portable computer used for organizational activities',
    },
    {
      code: 'DESKTOP_COMPUTER',
      name: 'Desktop Computer',
      categoryCode: 'IT_EQUIPMENT',
      description: 'Desktop computer used for organizational activities',
    },
    {
      code: 'MONITOR',
      name: 'Monitor',
      categoryCode: 'IT_EQUIPMENT',
      description: 'Computer display monitor',
    },
    {
      code: 'PRINTER',
      name: 'Printer',
      categoryCode: 'IT_EQUIPMENT',
      description: 'Printer used for organizational activities',
    },
    {
      code: 'SERVER',
      name: 'Server',
      categoryCode: 'IT_EQUIPMENT',
      description: 'Server computer used for organizational systems',
    },

    {
      code: 'ROUTER',
      name: 'Router',
      categoryCode: 'COMMUNICATIONS_EQUIPMENT',
      description: 'Network routing equipment',
    },
    {
      code: 'NETWORK_SWITCH',
      name: 'Network Switch',
      categoryCode: 'COMMUNICATIONS_EQUIPMENT',
      description: 'Network switching equipment',
    },
    {
      code: 'TELEPHONE',
      name: 'Telephone',
      categoryCode: 'COMMUNICATIONS_EQUIPMENT',
      description: 'Telephone communication equipment',
    },

    {
      code: 'OFFICE_DESK',
      name: 'Office Desk',
      categoryCode: 'FURNITURE_FIXTURES',
      description: 'Desk used for office activities',
    },
    {
      code: 'OFFICE_CHAIR',
      name: 'Office Chair',
      categoryCode: 'FURNITURE_FIXTURES',
      description: 'Chair used for office activities',
    },
    {
      code: 'FILING_CABINET',
      name: 'Filing Cabinet',
      categoryCode: 'FURNITURE_FIXTURES',
      description: 'Cabinet used for document and material storage',
    },

    {
      code: 'PHOTOCOPIER',
      name: 'Photocopier',
      categoryCode: 'OFFICE_EQUIPMENT',
      description: 'Photocopying equipment',
    },
    {
      code: 'SCANNER',
      name: 'Scanner',
      categoryCode: 'OFFICE_EQUIPMENT',
      description: 'Document scanning equipment',
    },
    {
      code: 'PROJECTOR',
      name: 'Projector',
      categoryCode: 'OFFICE_EQUIPMENT',
      description: 'Projection equipment used for presentations',
    },

    {
      code: 'GENERATOR',
      name: 'Generator',
      categoryCode: 'POWER_ELECTRICAL',
      description: 'Electrical power generation equipment',
    },

    {
      code: 'VEHICLE',
      name: 'Vehicle',
      categoryCode: 'VEHICLES',
      description: 'Organizational motor vehicle',
    },

    {
      code: 'OTHER',
      name: 'Other',
      categoryCode: 'OTHER',
      description: 'Asset type not covered by the standard classifications',
    },
  ];
  for (const assetType of assetTypes) {
    const categoryId = categoryMap.get(assetType.categoryCode);

    if (!categoryId) {
      throw new Error(
        `Asset category not found for code: ${assetType.categoryCode}`,
      );
    }

    await prisma.assetType.upsert({
      where: {
        code: assetType.code,
      },
      update: {
        name: assetType.name,
        description: assetType.description,
        categoryId,
      },
      create: {
        code: assetType.code,
        name: assetType.name,
        description: assetType.description,
        categoryId,
      },
    });
  }
  console.log('PMS seed completed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
