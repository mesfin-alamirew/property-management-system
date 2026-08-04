import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.country.createMany({
    data: [
      {
        code: 'ETH',
        name: 'Ethiopia',
      },
      {
        code: 'KEN',
        name: 'Kenya',
      },
      {
        code: 'USA',
        name: 'United States',
      },
      {
        code: 'GBR',
        name: 'United Kingdom',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Countries seeded successfully');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
