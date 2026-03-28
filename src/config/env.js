require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV || 'development'
};
