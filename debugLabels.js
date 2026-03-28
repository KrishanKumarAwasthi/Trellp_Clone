const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debug() {
  const cards = await prisma.card.findMany({
    where: { title: 'Design UI mockup' },
    include: { labels: { include: { label: true } } }
  });

  console.log('Cards found:', JSON.stringify(cards, null, 2));

  const labels = await prisma.label.findMany();
  console.log('Available labels:', JSON.stringify(labels, null, 2));

  await prisma.$disconnect();
}

debug();
