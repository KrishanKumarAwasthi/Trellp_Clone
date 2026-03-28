const app = require('./app');
const env = require('./config/env');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const startServer = async () => {
  try {
    // Attempt to connect to InsForge PostgreSQL to verify connection
    await prisma.$connect();
    console.log('📦 Successfully connected to the database via Prisma ORM');

    app.listen(env.port, () => {
      console.log(`🚀 Server running in ${env.nodeEnv} mode on port ${env.port}`);
    });
  } catch (error) {
    console.error('💥 Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
