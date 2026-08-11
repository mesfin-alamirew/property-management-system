import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Starting PMS seed...');

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

  console.log('PMS seed completed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
