// db.js
import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

import { development, production } from './knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const config = environment === 'production' ? production : development;

const db = knex(config);

// בדיקה אם החיבור הצליח
db.raw('SELECT 1')
  .then(() => {
    console.log('✅ Database connection successful');
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });

export default db;
