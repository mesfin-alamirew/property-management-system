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

  console.log('PMS seed completed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
