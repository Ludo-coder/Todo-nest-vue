import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  // Effacer toutes les données existantes
  await prisma.user.deleteMany({});
  await prisma.todo.deleteMany({});
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

  await prisma.todo.create({
    data: {
      title: 'Todo1',
      content: 'lorem ipsum dolor sit amet',
      priority: 'HAUT',
      executionDate: new Date('2025-08-01'),
      category: 'TRAVAIL',
      userId: 1,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo2',
      content: 'lorem ipsum dolor sit amet',
      priority: 'MOYEN',
      category: 'PERSONNEL',
      userId: 1,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo3',
      content: 'lorem ipsum dolor sit amet',
      priority: 'BAS',
      category: 'AUTRE',
      userId: 1,
    },
  });

  await prisma.todo.create({
    data: {
      title: 'Todo1',
      content: 'lorem ipsum dolor sit amet',
      priority: 'HAUT',
      category: 'TRAVAIL',
      userId: 2,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo2',
      content: 'lorem ipsum dolor sit amet',
      priority: 'MOYEN',
      category: 'SHOPPING',
      executionDate: new Date('2025-08-01'),
      userId: 2,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo3',
      content: 'lorem ipsum dolor sit amet',
      priority: 'BAS',
      category: 'AUTRE',
      userId: 2,
    },
  });

  await prisma.todo.create({
    data: {
      title: 'Todo1',
      content: 'lorem ipsum dolor sit amet',
      priority: 'HAUT',
      category: 'TRAVAIL',
      userId: 3,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo2',
      content: 'lorem ipsum dolor sit amet',
      priority: 'HAUT',
      category: 'PERSONNEL',
      userId: 3,
    },
  });
  await prisma.todo.create({
    data: {
      title: 'Todo3',
      content: 'lorem ipsum dolor sit amet',
      priority: 'HAUT',
      category: 'AUTRE',
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
