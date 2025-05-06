import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

import { development, production } from './knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const config = environment === 'production' ? production : development;

const db = knex(config);

db.raw('SELECT 1')
  .then(() => {
    console.log('✅ Database connection successful');
  })
  .catch((err) => {
    console.error(
        '❌ Database connection failed:', err.message,
        {host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,}
      );
  });

export default db;
