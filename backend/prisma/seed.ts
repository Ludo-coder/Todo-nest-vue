import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  // Effacer toutes les données existantes
  await prisma.user.deleteMany({});
  await prisma.todo.deleteMany({});
  await prisma.category.deleteMany({});
  console.log('Database cleared.');

  console.log('Seeding...');
  await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Toto',
      email: 'toto@kresus.eu',
      password: 'test',
      profileUrl: 'https://picsum.photos/id/237/200/300',
    },
  });
  await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Tata',
      email: 'tata@kresus.eu',
      password: 'test',
      profileUrl: 'https://picsum.photos/id/237/200/300',
    },
  });
  await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Titi',
      email: 'titi@kresus.eu',
      password: 'test',
      profileUrl: 'https://picsum.photos/id/237/200/300',
    },
  });

  await prisma.category.create({
    data: {
      name: 'WORK',
    },
  });
  await prisma.category.create({
    data: {
      name: 'PERSONAL',
    },
  });
  await prisma.category.create({
    data: {
      name: 'SHOPPING',
    },
  });
  await prisma.category.create({
    data: {
      name: 'OTHER',
    },
  });

  await prisma.todo.create({
    data: {
      title: 'Todo1',
      content: 'lorem ipsum dolor sit amet',
      priority: 'HIGH',
      executionDate: new Date('2025-08-01'),
      category: 'WORK',
      userId: 1,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo2',
      content: 'lorem ipsum dolor sit amet',
      priority: 'MEDIUM',
      category: 'PERSONAL',
      userId: 1,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo3',
      content: 'lorem ipsum dolor sit amet',
      priority: 'LOW',
      category: 'OTHER',
      userId: 1,
    },
  });

  await prisma.todo.create({
    data: {
      title: 'Todo1',
      content: 'lorem ipsum dolor sit amet',
      priority: 'HIGH',
      category: 'WORK',
      userId: 2,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo2',
      content: 'lorem ipsum dolor sit amet',
      priority: 'MEDIUM',
      category: 'SHOPPING',
      executionDate: new Date('2025-08-01'),
      userId: 2,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo3',
      content: 'lorem ipsum dolor sit amet',
      priority: 'LOW',
      category: 'OTHER',
      userId: 2,
    },
  });

  await prisma.todo.create({
    data: {
      title: 'Todo1',
      content: 'lorem ipsum dolor sit amet',
      priority: 'HIGH',
      category: 'WORK',
      userId: 3,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo2',
      content: 'lorem ipsum dolor sit amet',
      priority: 'HIGH',
      category: 'PERSONAL',
      userId: 3,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo3',
      content: 'lorem ipsum dolor sit amet',
      priority: 'HIGH',
      category: 'OTHER',
      userId: 3,
    },
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
