const dotenv = require('dotenv')
dotenv.config()

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  synchronize: process.env.SYNCHRONIZE,
  logging: false,
  ssl: process.env.SSL,
  entities: ['build/database/entities/**/*.js'],
  cache: process.env.TYPEORM_CACHE_ENABLE
    ? {
        duration: process.env.TYPEORM_CACHE_DURATION,
      }
    : false,
}

module.exports = config
