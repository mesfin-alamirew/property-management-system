import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

async function main() {
  const { prisma } = await import('../src/lib/prisma');

  const { createBuildingAction } =
    await import('../src/features/building/building/actions/building.actions');

  const user = await prisma.user.findUnique({
    where: {
      username: 'dev.user',
    },
  });

  if (!user) {
    throw new Error('Development user not found');
  }

  console.log('Development user:', {
    id: user.id,
    username: user.username,
  });

  const formData = {
    propertyId: 'cmsnaivm90004qov61xfuzeei',
    buildingCode: `TEST-${Date.now()}`,
    name: 'Authorization Test Building',
    buildingTypeId: 'cmsohdv3u00073hv6bvehy0l4',
  };

  console.log('Creating test building...');

  const result = await createBuildingAction(formData);

  console.log('Create Building Action result:', result);

  if (!result.success) {
    throw new Error(`Building creation failed: ${result.message}`);
  }

  console.log('Building created successfully:', result.data);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
