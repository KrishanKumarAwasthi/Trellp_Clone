const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean up existing data to ensure idempotent seeding
  await prisma.board.deleteMany();
  await prisma.member.deleteMany();
  await prisma.label.deleteMany();

  console.log('🧹 Cleaned existing data (Cascade deletes handled children).');

  // Create Members
  const member1 = await prisma.member.create({ data: { name: 'Alice Smith' } });
  const member2 = await prisma.member.create({ data: { name: 'Bob Johnson' } });
  const member3 = await prisma.member.create({ data: { name: 'Charlie Davis' } });

  // Create Labels
  const labelBug = await prisma.label.create({ data: { name: 'Bug', color: '#ff4d4f' } });
  const labelFeature = await prisma.label.create({ data: { name: 'Feature', color: '#1890ff' } });
  const labelUrgent = await prisma.label.create({ data: { name: 'Urgent', color: '#faad14' } });

  // Create Board with 3 Lists and 10 Cards
  const board = await prisma.board.create({
    data: {
      title: 'Product Roadmap',
      lists: {
        create: [
          {
            title: 'To Do',
            position: 1000,
            cards: {
              create: [
                {
                  title: 'Design UI mockup',
                  description: 'Create initial design in Figma.',
                  position: 1000,
                  dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
                  labels: { create: [{ labelId: labelFeature.id }] },
                  members: { create: [{ memberId: member1.id }] },
                },
                {
                  title: 'Setup Database',
                  description: 'Provision InsForge PostgreSQL and Prisma schema.',
                  position: 2000,
                  dueDate: new Date(),
                  labels: { create: [{ labelId: labelUrgent.id }] },
                  members: { create: [{ memberId: member2.id }] },
                  checklists: {
                    create: [
                      {
                        items: {
                          create: [
                            { content: 'Install Prisma', completed: true },
                            { content: 'Write Schema', completed: true },
                            { content: 'Migrate DB', completed: false }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  title: 'Write Auth Middleware',
                  description: 'Mock user injections for global context.',
                  position: 3000,
                  labels: { create: [{ labelId: labelFeature.id }] },
                  members: { create: [{ memberId: member3.id }] },
                },
              ]
            }
          },
          {
            title: 'In Progress',
            position: 2000,
            cards: {
              create: [
                {
                  title: 'Build Board API',
                  description: 'CRUD endpoints for boards.',
                  position: 1000,
                  labels: { create: [{ labelId: labelBug.id }, { labelId: labelUrgent.id }] },
                  members: { create: [{ memberId: member1.id }, { memberId: member2.id }] },
                },
                {
                  title: 'Build List API',
                  description: 'Reordering logic via floating point math.',
                  position: 2000,
                },
                {
                  title: 'Build Card API',
                  description: 'Card cross-list drag and drop capability.',
                  position: 3000,
                  labels: { create: [{ labelId: labelFeature.id }] },
                },
                {
                  title: 'Build Subtask Checklists',
                  description: 'Nested items for Cards',
                  position: 4000,
                  members: { create: [{ memberId: member3.id }] },
                }
              ]
            }
          },
          {
            title: 'Done',
            position: 3000,
            cards: {
              create: [
                {
                  title: 'Project Kickoff',
                  position: 1000,
                  members: { create: [{ memberId: member1.id }] }
                },
                {
                  title: 'Architecture Review',
                  position: 2000,
                  labels: { create: [{ labelId: labelFeature.id }] }
                },
                {
                  title: 'Scaffold Express App',
                  position: 3000,
                  labels: { create: [{ labelId: labelUrgent.id }] },
                  members: { create: [{ memberId: member2.id }] }
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log(`✅ Seeding finished successfully!`);
}

main()
  .catch((e) => {
    console.error('💥 Seeding Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
